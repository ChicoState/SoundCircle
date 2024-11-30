import { Controller, Get, Query, Route } from 'tsoa';
import { placesAutocomplete, placeDetails } from '../../GoogleAPI/GoogleAPICalls';
import { LocationDetails } from '../../GoogleAPI/GoogleAPICalls';

@Route('googleApi')
export class PlacesController extends Controller {
    
    /**
     * 
     * @param input The text string on which to search (example: sacramento)
     * @param radius Defines the distance (in meters) within which to return place results
     * @param types Restricts the type of location returned (example: locality)
     * @returns A list of autocomplete results
     */
    @Get('/placesAutocomplete')
    public async getAutocomplete(
        @Query('input') input: string,
        @Query('radius') radius: string,
        @Query('types') types: string
    ): Promise<string | null> {
        try {
            const result = await placesAutocomplete(input, radius, types);
            
            if (result){
                this.setStatus(200);
                return result;
            }
            else {
                this.setStatus(204);
                return null;
            }
        } catch(error) {
            this.setStatus(500);
            throw new Error('Failed to retrieve autocomplete results');
        }
    }

    /**
     * This will take a place_id from the autocomplete results and return the coordinates so we can update the user's location
     * @param place_id A textual identifier that uniquely identifies a place, returned from a Place Search.
     * @returns The geometry (lat / lng) of the location matching the place_id
     */
    @Get('/placeDetails')
    public async getPlaceDetails(
        @Query('place_id') place_id: string
    ): Promise<LocationDetails | null> {
        try {
            const result = await placeDetails(place_id);

            if (result){
                this.setStatus(200);
                return result;
            }
            else {
                this.setStatus(204);
                return null;
            }
        } catch(error) {
            this.setStatus(500);
            throw new Error(`Failed to retrieve place details, ${error}`);
        }
    }
}