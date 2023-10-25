






import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getLikedLocations } from '../localStorageService/localStorageService';
import { toast } from 'react-toastify';
import { getCountryByGeolocation } from '../requstService/requstService';


const LocationContext = createContext();
export default function LocationProvider({children}) {

    const [likedLocations , setLikedLocations] = useState(null);
    const [isCelsius , setIsCelsius] = useState(true);
    const [geolocation,setGeolocation] = useState(null);
    const [search,setSearch] = useState({label:"Tel Aviv",locationKey:"215854"});

    const getGeolocation = useCallback( async ()=>{
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
        }else{
            await navigator.geolocation.getCurrentPosition((position)=>{

                setGeolocation(position.coords)
                toast.success("Geolocation has been successfully changed")

            },(err)=>toast.error(err.message))
            
            const countryData =  await getCountryByGeolocation(geolocation?.latitude.toFixed(1),geolocation?.longitude.toFixed(1));
            console.log(countryData);
            if (countryData.Country.LocalizedName && countryData.Key) {
                setSearch({label:countryData?.Country?.LocalizedName,locationKey:countryData?.Key});
            }
            
            
        }
    }
    ,[geolocation])


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
    <LocationContext.Provider value={{...value,updateLikedLocations,imageGen,toggleCelsius,getGeolocation}}>
        {children}
    </LocationContext.Provider>
  )
}



export const useLocationService = ()=>{

    const context = useContext(LocationContext);
    if (!context) throw new Error("useUser must be used within a NameProvider");
    return context;

};