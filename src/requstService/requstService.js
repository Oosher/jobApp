import axios from "axios"



export const getAutoCompleatData = async(userInput)=>{
    try{
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=s470nhTGUgkl9Dv0esPxppAE3qo2AOse&q=${userInput}`);


        return res;
    }

    catch(err)
    {
        console.log(err)
    }

}



export const getCurrentWeather = async (countryKey) =>{

    try{
        const res = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${countryKey}?apikey=s470nhTGUgkl9Dv0esPxppAE3qo2AOse`);

        return res.data;
    }
    catch(err){
        console.log(err);
    }


}








export const getFiveDaysForecast = async (locationKey) =>{

    try{
        const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=s470nhTGUgkl9Dv0esPxppAE3qo2AOse&metric=true`);

        return res?.data?.DailyForecasts;
    }
    catch(err){
        
        console.log(err);
    }


}


