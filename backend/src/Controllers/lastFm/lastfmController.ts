import { Get, Route, Query, Controller } from 'tsoa';
import { ArtistMatches, ArtistSearchResponse } from '../../../Types/lastfm/artistSearch'
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const { LAST_FM_KEY } = process.env;

@Route('lastfm')
export class LastfmController extends Controller {
    /**
     * Search for artists on Last.fm by name.
     * @param artistName The name of the artist to search for
     */
    @Get('artist/search')
    public async searchArtist(@Query() artistName: string): Promise<ArtistMatches> {
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(artistName)}&api_key=${LAST_FM_KEY}&format=json`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch artist data: ${response.statusText}`);
        }

        const data = await response.json() as ArtistSearchResponse;
        return data.results.artistmatches;
    }
}
