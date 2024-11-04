// Use the browsers Geolocation API to get the current location
export function getCurrentLocation(): Promise<GeolocationCoordinates | null> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (error) => reject(error)
            );
        } else {
            reject(new Error("Geolocation is not supported or granted by this browser."));
        }
    });
}

// Use latitude, longitude, and given distance to check if the search lat/long falls within the dist
export function isWithinDistance(
    currentLat: number,
    currentLng: number,
    searchLat: number,
    searchLng: number,
    distance: number
): boolean {
    const latRange = distance / 69; // 1 degree latitude = about 69 miles
    const lngRange = distance / (69 * Math.cos((currentLat * Math.PI) / 180)); // adjust for longitude

    // Return true if the search lat/lng falls within our distance
    return (
        searchLat >= (currentLat - latRange) && searchLat <= (currentLat + latRange) &&
        searchLng >= (currentLng - lngRange) && searchLng <= (currentLng + lngRange)
    );
}