import { Get, Route, Query, Controller } from 'tsoa';
import { ArtistMatches, ArtistSearchResponse } from '../../../Types/lastfm/artistSearch'

@Route('lastfm')
export class LastfmController extends Controller {
    /**
     * Search for artists on Last.fm by name.
     * @param artistName The name of the artist to search for
     */
    @Get('artist/search')
    public async searchArtist(@Query() artistName: string): Promise<ArtistMatches> {
        const apiKey = '3ae0261cc5d6cbf082fbd18f66dcfa35';  // Replace with your Last.fm API key
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch artist data: ${response.statusText}`);
        }

        const data = await response.json() as ArtistSearchResponse;
        return data.results.artistmatches;
    }
}
