import request from "request";

export default function(lat, lon, callback) {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=34b515c6e2429be5b2eb8e26380fa86f';
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service !', undefined);
        } else if (response.body.cod === '400') {
            callback('Something is wrong with th provided coordinates !', undefined);
        } else {
            const current = response.body.current
            callback(undefined, {
                temp: current.temp,
                main: current.weather[0].main,
                description: current.weather[0].description,
            });
        }
    });
}