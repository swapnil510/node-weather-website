const request = require('request');

const geoCode = (address, callback)=>{

    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3dhcG5pbDUxMCIsImEiOiJja2dzcW5nMDcwM3NqMnhuMml1YTByNHFwIn0.u4nGTo2ZWRAXnnET387Plw&limit=1';
    request({
        url,//using object shorthand
        json:true
    },
    (error,{body}={})=>{
        if(error){
            callback('Unable to Connect',undefined);
        }else if( !body || !body.features || body.features.length ==0 ){
            callback('Unable to find location please change your search',undefined);
        }else{
        console.log(body.features[0].center[0] + '  ' + body.features[0].center[1] + ' ' + body.features[0].place_name);
        const data ={
            longitude:body.features[0].center[0],
            latitude:body.features[0].center[1],
            location:body.features[0].place_name
        }
        callback(error,data);
        }
    });
}

module.exports= geoCode;