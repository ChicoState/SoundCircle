// Define the image structure for each artist
interface ArtistImage {
  '#text': string; // URL of the image
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega';
}

// Define the structure of each artist in the artist matches
interface Artist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: ArtistImage[];
}

// Define the artist matches structure
export interface ArtistMatches {
  artist: Artist[];
}

// Define the opensearch query structure
interface OpenSearchQuery {
  '#text': string;
  role: string;
  searchTerms: string;
  startPage: string;
}

// Define the main response structure for an artist search response
export interface ArtistSearchResponse {
  results: {
      'opensearch:Query': OpenSearchQuery;
      'opensearch:totalResults': string;
      'opensearch:startIndex': string;
      'opensearch:itemsPerPage': string;
      artistmatches: ArtistMatches;
  };
}
