const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/forecast?access_key=fafa8e0300f2f0023ca165ee97eaefe7&query='+latitude+','+longitude+'&units=f';

                // identical name url : url 
    request( {url, json : true}, (error, {body}={}) => {
        if(error)
        {
            callback('Unable to connect weather service !',undefined);
        }
        else if(body.error)
        {
            callback('unable to find location',undefined);
        }
        else
        {
           callback(undefined, "It is currently "+ body.current.temperature);
        }
    })
}

module.exports = forecast;