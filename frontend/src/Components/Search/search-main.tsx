import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface SearchMainFeedProps {
  searchData: string;
}

interface ArtistInfo {
  bio: string;
  images: string[];
  topAlbums: { name: string; playcount: number; image: { '#text': string; size: string }[] }[];
  topTracks: { name: string; playcount: number; image: { '#text': string; size: string }[] }[];
}

interface WikimediaImageInfo {
  url: string;
}

interface WikimediaPage {
  imageinfo: WikimediaImageInfo[];
}

interface WikimediaQueryResponse {
  query: {
    pages: {
      [key: string]: WikimediaPage;
    };
  };
}

const SearchMainFeed: React.FC<SearchMainFeedProps> = ({ searchData }) => {
  const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtistInfo = useCallback(async () => {
    if (!searchData) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch artist info from Last.fm
      const infoResponse = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchData}&api_key=${process.env.REACT_APP_LAST_FM_KEY}&format=json`
      );

      if (!infoResponse.ok) throw new Error('Error fetching artist info from Last.fm');
      const infoData = await infoResponse.json();
      const artist = infoData.artist;

      if (!artist) {
        setError('Artist not found');
        return;
      }

      const mbid = artist.mbid;
      console.log('MBID:', mbid);  // Log MBID for debugging

      // Fetch additional images from MusicBrainz using the MBID
      let musicBrainzImages: string[] = [];
      if (mbid) {
        const musicBrainzResponse = await fetch(`https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`);
        if (musicBrainzResponse.ok) {
          const musicBrainzData = await musicBrainzResponse.json();
          console.log('MusicBrainz Data:', musicBrainzData);  // Log MusicBrainz data for debugging
          const wikimediaLink = musicBrainzData.relations?.find((rel: any) => rel.type === 'wikimedia commons');

          if (wikimediaLink) {
            const wikimediaTitle = wikimediaLink.url.resource.split('/').pop(); // Get the file name
            const wikimediaResponse = await fetch(
              `https://en.wikipedia.org/w/api.php?action=query&titles=File:${wikimediaTitle}&prop=imageinfo&iiprop=url&format=json&origin=*`
            );

            if (wikimediaResponse.ok) {
              const wikimediaData: WikimediaQueryResponse = await wikimediaResponse.json();
              console.log('Wikimedia Data:', wikimediaData);  // Log Wikimedia data for debugging
              const pages = wikimediaData.query.pages;
              const page = Object.values(pages)[0];

              if (page?.imageinfo?.length) {
                musicBrainzImages = page.imageinfo.map((info) => info.url); // Extract actual image URLs
              }
            }
          }
        }
      }

      // Fetch top albums and tracks from Last.fm
      const albumsResponse = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=${searchData}&api_key=${process.env.REACT_APP_LAST_FM_KEY}&format=json`
      );
      const albumsData = await albumsResponse.json();
      const topAlbums = albumsData.topalbums.album || [];

      const tracksResponse = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist=${searchData}&api_key=${process.env.REACT_APP_LAST_FM_KEY}&format=json`
      );
      const tracksData = await tracksResponse.json();
      const topTracks = tracksData.toptracks.track || [];

      setArtistInfo({
        bio: artist.bio.summary,
        images: musicBrainzImages,
        topAlbums,
        topTracks,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchData]);

  useEffect(() => {
    fetchArtistInfo();
  }, [fetchArtistInfo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5 space-y-5 text-white">
      <h1 className="text-3xl">{searchData || 'Artist'}</h1>

      {/* Display artist images */}
      {artistInfo?.images?.length ? (
        <div className="flex space-x-4">
          {artistInfo.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={searchData}
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      ) : (
        <p>No images available for this artist.</p>
      )}

      {/* Display artist biography */}
      <div>
        <h2 className="text-2xl mt-4">Biography</h2>
        <p>{artistInfo?.bio || 'No biography available.'}</p>
      </div>

      {/* Display top albums */}
      <div>
        <h2 className="text-2xl mt-4">Top Albums</h2>
        <div className="grid grid-cols-3 gap-4">
          {artistInfo?.topAlbums?.length ? (
            artistInfo.topAlbums.map((album, index) => (
              <div key={index} className="space-y-2">
                <span className="font-semibold block">{album.name}</span>
                <div className="relative">
                  <img
                    src={album.image[2]?.['#text'] || ''}
                    alt={album.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <p>Plays: {album.playcount}</p>
              </div>
            ))
          ) : (
            <p>No albums available.</p>
          )}
        </div>
      </div>

      {/* Display top tracks */}
      <div>
        <h2 className="text-2xl mt-4">Top Tracks</h2>
        <ul>
          {artistInfo?.topTracks?.length ? (
            artistInfo.topTracks.map((track, index) => (
              <li key={index} className="mt-2">
                <span className="font-semibold">{track.name}</span> - Plays: {track.playcount}
              </li>
            ))
          ) : (
            <p>No tracks available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchMainFeed;
