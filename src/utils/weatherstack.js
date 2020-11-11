const request = require('request');

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b7c6ce703cb6c1a5e197377d0955147d&query='+latitude+ ',' + longitude + '&units=m';
    console.log(url);
    request({
        url,//using object shorthand
        json:true
    },
    (error,{body}) =>{
        if(error){
                    callback('Error occurred', undefined);
        }else if(body.error){
                    callback('Invalid Input',undefined);
        }
        else{
            callback(undefined,{
                temperature: body.current.temperature,
                feels_like:body.current.feelslike,
                weather_descriptions:body.current.weather_descriptions[0],
                time:body.current.observation_time

            })
            //console.log(chalk.green.inverse('Current temperature is ' + response.body.current.temperature  + ' But it feels like ') + chalk.red.inverse(response.body.current.feelslike))
            //console.log(response.body.current.weather_descriptions[0] + ' and time is ' + response.body.current.observation_time);
        }
    })

}

module.exports =forecast;