import axios from "axios"





export const getAutoCompleatData = async()=>{
    try{
        const res = await axios.get("http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=YArL1ICnb5lloH1sZGGsf9Zvmrjwpf0i");

        console.log(res);

        return res;
    }

    catch(err)
    {
        console.log(err)
    }

}



export const getCurrentWeather = async (countryKey) =>{

    try{
        const res = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${countryKey}?apikey=YArL1ICnb5lloH1sZGGsf9Zvmrjwpf0i`);

        return res.data;
    }
    catch(err){
        console.log(err);
    }


}


