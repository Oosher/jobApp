






import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getLikedLocations } from '../localStorageService/localStorageService';
import { toast } from 'react-toastify';
import { getCountryByGeolocation } from '../requstService/requstService';


const LocationContext = createContext();
export default function LocationProvider({children}) {

    const [likedLocations , setLikedLocations] = useState(null);
    const [isCelsius , setIsCelsius] = useState(true);
    const [search,setSearch] = useState({label:"Tel Aviv",locationKey:"215854"});

    function getLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    const getGeolocation = useCallback( async ()=>{

        try{

            if (!navigator.geolocation) {

                toast.error("Geolocation is not supported by your browser");

            }else{
                const {coords} = await getLocation();
                toast.success("Geolocation has been successfully changed");
                
                const countryData =  await getCountryByGeolocation(coords?.latitude.toFixed(1),coords?.longitude.toFixed(1));
                
                if (countryData) {
                    setSearch({label:await countryData?.Country?.LocalizedName,locationKey:await countryData?.Key});
                }
                
                
            }
        }catch(err){
            toast.error(err.message)
        }
    }

    ,[])


    const toggleCelsius =useCallback(()=>{

        setIsCelsius((prev)=>!prev);

    },[])

    const fixWeatherIcon = (imageIcon)=>{
    
        if (imageIcon<10) {
            return "0"+imageIcon ;
        }
        else{
            return imageIcon
        }
    }

    const dateToDay = useCallback((date)=>{

        const newDate = new Date(date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        
        return days[newDate.getDay()];


    },[])

    const imageGen = useCallback((imageIcon)=> `https://developer.accuweather.com/sites/default/files/${ fixWeatherIcon(imageIcon)}-s.png`
    ,[])


    const updateLikedLocations = useCallback(()=>{

            getLikedLocations()
            .then((res)=>setLikedLocations(res))
            .then(()=>{if (!likedLocations) {
                setLikedLocations([])
            }})
        

    },[likedLocations])

    useEffect(()=>{
        const setInitialLiked =async ()=>{
        if(!likedLocations){
            
            const localStorageLikedLocations = await getLikedLocations();
            
            if (!localStorageLikedLocations) {
                
                await setLikedLocations([]);
            }else{
                setLikedLocations(localStorageLikedLocations);
            }
        }
    }
    setInitialLiked();
    },[likedLocations])


    
    const value = useMemo(()=>({likedLocations,isCelsius,search,setSearch}),[likedLocations,isCelsius,search,setSearch])

  return (
    <LocationContext.Provider value={{...value,updateLikedLocations,imageGen,toggleCelsius,getGeolocation,dateToDay}}>
        {children}
    </LocationContext.Provider>
  )
}



export const useLocationService = ()=>{

    const context = useContext(LocationContext);
    if (!context) throw new Error("useUser must be used within a NameProvider");
    return context;

};