import request from "request";

export default function(address, callback) {
    if (!address) {
        callback('You must provide a search term !', undefined);
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5raXRuIiwiYSI6ImNreXY1dmxyajF1bDIydm83YzM3ZHh6YWwifQ.NYFwrzumc6RInUzGlONhgg&limit=1'
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geocoding service !', undefined);
        } else if (response.body.features.length === 0) {
            callback('Can not find location with provided serach term !', undefined);
        } else {
            const result = response.body.features[0];
            callback(undefined, {
                latitude: result.center[1],
                longitude: result.center[0],
                location: result.place_name
            });
        }
    });
}