// To use:
// npm i -D @types/google.maps

export const getDistanceBetweenPoints() {
    const resulst = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json
        ?destinations=New%20York%20City%2C%20NY
        &origins=Washington%2C%20DC
        &units=imperial
        &key=${GOOGLE_API_KEY}`);
}