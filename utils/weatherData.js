const request=require('request');
const constants=require('../config');

async function  weatherData(address,callback){
	const url=constants.openWeatherMap.BASE_URL+address+'&appid='+constants.openWeatherMap.SECRET_KEY;
    await request(url,function(error,resp,body){
    	if(error){
    		callback('Can\'t return data',undefined);
    	}
    	else{
        
    	const bd=JSON.parse(body);//string to JSON object
    	callback(undefined,{
          temperature:bd.main.temp,
          description:bd.weather[0].main,
          details:bd.weather[0].description,
          cityName:bd.name
    	});
    } 
    
    });
}
module.exports=weatherData;