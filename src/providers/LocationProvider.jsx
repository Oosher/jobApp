






import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getLikedLocations } from '../localStorageService/localStorageService';


const LocationContext = createContext();
export default function LocationProvider({children}) {

    const [likedLocations , setLikedLocations] = useState(null);
    const [isCelsius , setIsCelsius] = useState(true);
    

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


    
    const value = useMemo(()=>({likedLocations,isCelsius}),[likedLocations,isCelsius])

  return (
    <LocationContext.Provider value={{...value,updateLikedLocations,imageGen,toggleCelsius}}>
        {children}
    </LocationContext.Provider>
  )
}



export const useLocationService = ()=>{

    const context = useContext(LocationContext);
    if (!context) throw new Error("useUser must be used within a NameProvider");
    return context;

};