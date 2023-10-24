

import { Autocomplete, Box, Container, Grid, Paper, TextField, CardMedia, Typography, debounce, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAutoCompleatData, getCurrentWeather, getFiveDaysForecast } from '../requstService/requstService'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocationService } from '../providers/LocationProvider';
import { removeLikedLocation, saveLikedLocationsToLocalStorage } from '../localStorageService/localStorageService';

export default function Index() {
  const defaultWeather = {
    "LocalObservationDateTime": "2023-10-25T02:07:00+03:00",
    "EpochTime": 1698188820,
    "WeatherText": "Partly cloudy",
    "WeatherIcon": 35,
    "HasPrecipitation": false,
    "PrecipitationType": null,
    "IsDayTime": false,
    "Temperature": {
        "Metric": {
            "Value": 24.3,
            "Unit": "C",
            "UnitType": 17
        },
        "Imperial": {
            "Value": 76,
            "Unit": "F",
            "UnitType": 18
        }
    },
    "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
}
  const [search,setSearch] = useState(null);
  const [locations , setLocations] = useState([]);
  const [currentWeather,setCurrentWeather] = useState(defaultWeather);
  const [fiveDaysForecast,setFiveDaysForecast] = useState([]);
  const [isFavorite,setIsFavorite] = useState(false);

  const {likedLocations, updateLikedLocations,imageGen} = useLocationService();
  


    useEffect(()=>{

        const locationExist = likedLocations?.findIndex((location)=>location.name===search?.label);

        setIsFavorite(locationExist!==-1 );

    },[likedLocations,search?.label]);

    console.log(currentWeather);

    const getAutocompleteFromUserInput = async ({target})=>{

        if (target.value.length>0) {
          const res = await getAutoCompleatData(target.value);
          await setLocations(res?.data?.map((locationData)=>{return{label:locationData?.LocalizedName,locationKey:locationData?.Key}}))
  
          setLocations((prev)=>prev.filter((locationData, i, self) => {
            return self.findIndex((ld) => ld.label === locationData.label) === i;
        }))
        }
      
    }
  

    const debouncedGetAutocompleteFromUserInput = debounce(getAutocompleteFromUserInput,300);

    const handleChange = ({target},newValue)=>{
    
      setSearch((prev)=>newValue?newValue:prev);

      getCurrentWeather(newValue?.locationKey).then((res)=>setCurrentWeather(res?.[0])) 

      getFiveDaysForecast(newValue?.locationKey).then((res)=>setFiveDaysForecast(res));
      
    } 





    const handleFavorite = async()=>{

    
      if ( isFavorite) {

        await removeLikedLocation(search.label);

        setIsFavorite(false);

        await updateLikedLocations();
        
      }else{

        await saveLikedLocationsToLocalStorage({name:search.label,...currentWeather});

        setIsFavorite(true);

        await updateLikedLocations();

      }

    
    }

    
    
  return (
    <Container sx={{display:"flex",width:"80vw",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    <Autocomplete
        sx={{width:"300px",margin:"4vh auto"}}
        id="search"
        options={locations?locations:[]}
        value={search}
        isOptionEqualToValue={(option,value)=>option.label===value.label}
        getOptionLabel={(option)=>option.label}
        onChange={handleChange}
        renderInput={(params)=>(
          <TextField {...params}
          id="search"
          label="Enter your location"
          onChange={debouncedGetAutocompleteFromUserInput}
          />
        )}   
      />
      <Paper >
        <Grid container gap={1}  justifyContent="center">
          <Grid item xs={12} >
            <Paper sx={{display:"flex",alignItems:"center",flexDirection:"column" ,padding:"15px",justifyContent:"center",alignContent:"center",justifyItems:"center"}}>
              <Typography variant="h4" color="initial">{search?.label}</Typography>
              <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CardMedia component="img" sx={{width:"20vw"}} title={currentWeather?.WeatherText} image={imageGen(currentWeather?.WeatherIcon)} />
                <Box >
                  <Typography variant="h4" color="initial">{currentWeather?.Temperature?.Metric.Value} {currentWeather?.Temperature?.Metric.Unit}</Typography>
                  <Typography variant="h4" color="initial">{currentWeather?.WeatherText}</Typography>
                </Box>
              </Box>
              <Box sx={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
                <IconButton onClick={handleFavorite}>
                  <FavoriteIcon fontSize="large" color={isFavorite?"error":"inherit"}/>
                </IconButton>
                </Box>
            </Paper>
          </Grid>

          {fiveDaysForecast?.map((day)=><Grid item xs={12} md={3} key={day?.Date}>
            <Paper sx={{display:"flex",justifyContent:"center",alignItems:"center", margin:"0 auto",height:"10vh",padding:"15px"}} >
            <CardMedia component="img" sx={{width:"50%"}} title={day?.Day?.IconPhrase} image={imageGen(day?.Day?.Icon)} />

            <Typography variant="h5" color="initial">{Math.floor(day?.Temperature.Maximum.Value)}/{Math.floor(day?.Temperature.Minimum.Value)}&deg;{day?.Temperature.Minimum.Unit}</Typography>
            </Paper>
            </Grid> )}

        </Grid>
      </Paper>
    </Container>
  )
}
