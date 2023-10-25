import axios from "axios"
import { toast } from "react-toastify";



export const getAutoCompleatData = async(userInput)=>{
    try{
        const res = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=s470nhTGUgkl9Dv0esPxppAE3qo2AOse&q=${userInput}`);


        return res;
    }

    catch(err)
    {
        console.log(err);
        toast.error(err.message);
    }

}



export const getCurrentWeather = async (countryKey) =>{

    try{
        const res = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${countryKey}?apikey=s470nhTGUgkl9Dv0esPxppAE3qo2AOse`);

        return res.data;
    }
    catch(err){
        console.log(err);
        toast.error(err.message);
    }


}








export const getFiveDaysForecast = async (locationKey,metric) =>{

    try{
        const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=s470nhTGUgkl9Dv0esPxppAE3qo2AOse&metric=${metric}`);

        return res?.data?.DailyForecasts;
    }
    catch(err){
        
        console.log(err);
        toast.error(err.message);
    }


}


