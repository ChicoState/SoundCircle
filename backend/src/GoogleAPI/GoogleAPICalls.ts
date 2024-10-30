// To use:
// npm i -D @types/google.maps
// npm install axios
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config({ path: '.env' });
const { GOOGLE_API_KEY } = process.env;

// Call google API and get the distance between origin and desitination points
export const getDistanceBetweenPoints = async (
    origin: string,
    destination: string
): Promise<string | null> => {
    try {
        // Using axios as it's WAY easier to call HTTP requests
        // Axios allows for better customization and interpretation of json responses
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json',
            {
                params: {
                    origin: origin,
                    destinations: destination,
                    units: 'imperial',
                    key: GOOGLE_API_KEY,
                },
            }
        );

        // If there is an error with the response, throw an error
        if (!response.data || !response.data.rows || response.data.rows.length === 0) {
            console.error(`Invalid response structure from GoogleAPI 'getDistanceBetweenPoints' call:`, response.data);
            return null;
        }

        const data = response.data.rows[0]?.element;

        // Check if response contains a valid distance element
        if (data?.status !== 'OK' || !data.distance) {
            console.error(`No valid distance data returned from GoogleAPI 'getDistanceBetweenPoints'.`)
            return null;
        }

        const distanceString = data.distance.text;

        return distanceString;
    } catch (err) {
        console.error(`Error processing 'getDistanceBetweenPoints' from GoogleAPI fetch:`, err);
        throw new Error(`Failed to fetch distance from getDistanceBetweenPoints.`);
    }
}