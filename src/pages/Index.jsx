

import { Autocomplete, Box, Container, Grid, Paper, TextField, CardMedia, Typography, debounce, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAutoCompleatData, getCurrentWeather, getFiveDaysForecast } from '../requstService/requstService'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocationService } from '../providers/LocationProvider';
import { removeLikedLocation, saveLikedLocationsToLocalStorage } from '../localStorageService/localStorageService';
import { toast } from 'react-toastify';
import { useTheme } from '../theme/ThemeProvider';


export default function Index() {
  
  
  const [locations , setLocations] = useState([]);
  const [currentWeather,setCurrentWeather] = useState({});
  const [fiveDaysForecast,setFiveDaysForecast] = useState([]);
  const [isFavorite,setIsFavorite] = useState(false);

  const {likedLocations, updateLikedLocations,imageGen,isCelsius,search,setSearch,dateToDay} = useLocationService();

  const {dark} = useTheme();

    useEffect(()=>{
      getCurrentWeather(search?.locationKey).then((res)=>setCurrentWeather(res?.[0])) 

      getFiveDaysForecast(search?.locationKey,isCelsius).then((res)=>setFiveDaysForecast(res));
    },[search.locationKey,isCelsius])

    useEffect(()=>{

        const locationExist = likedLocations?.findIndex((location)=>location.name===search?.label);

        setIsFavorite(locationExist!==-1 );

    },[likedLocations,search?.label]);

console.log(fiveDaysForecast);
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
      
      if (newValue) {
      
    
        setSearch((prev)=>newValue?newValue:prev);

        getCurrentWeather(newValue?.locationKey).then((res)=>setCurrentWeather(res?.[0])) 

        getFiveDaysForecast(newValue?.locationKey).then((res)=>setFiveDaysForecast(res));
    }
      
    } 
    


    const handleFavorite = async()=>{

    
      if ( isFavorite) {

        await removeLikedLocation(search.label);

        setIsFavorite(false);

        await updateLikedLocations();

        toast("The location has been removed your favorites")
        
      }else{

        await saveLikedLocationsToLocalStorage({name:search.label,...currentWeather});

        setIsFavorite(true);

        await updateLikedLocations();

        toast("The location has been added to your favorites")

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
      <Paper sx={{bgcolor:dark?"darkgray":"white"}}>
        <Grid container justifyContent="center" gap={0.8}>
          <Grid item xs={12} >
            <Paper sx={{display:"flex",alignItems:"center",flexDirection:"column" ,padding:"15px",justifyContent:"center",alignContent:"center",justifyItems:"center"}}>
              <Typography variant="h4" color={dark?"white":"initial"}>{search?.label}</Typography>
              <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CardMedia component="img" sx={{width:"20vw"}} title={currentWeather?.WeatherText} image={imageGen(currentWeather?.WeatherIcon)} />
                <Box >
                  <Typography variant="h4" color={dark?"white":"initial"}>{isCelsius?currentWeather?.Temperature?.Metric.Value:currentWeather?.Temperature?.Imperial.Value} &deg;{isCelsius?currentWeather?.Temperature?.Metric.Unit:currentWeather?.Temperature?.Imperial.Unit}</Typography>
                  <Typography variant="h4" color={dark?"white":"initial"}>{currentWeather?.WeatherText}</Typography>
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
            <Paper sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", margin:"0 auto",height:"10vh",padding:"15px"}} >
              <Typography variant="h6" color={dark?"white":"initial"}>{dateToDay(day?.Date)}</Typography>
            <Box display="flex" alignItems="center">

              <CardMedia component="img" sx={{width:"50%"}} title={day?.Day?.IconPhrase} image={imageGen(day?.Day?.Icon)} />

              <Typography variant="h5" color={dark?"white":"initial"}>{Math.floor(day?.Temperature.Maximum.Value)}/{Math.floor(day?.Temperature.Minimum.Value)}&deg;{day?.Temperature.Minimum.Unit}</Typography>
            </Box>
            </Paper>
            </Grid> )}

        </Grid>
      </Paper>
    </Container>
  )
}
