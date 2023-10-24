

import { Autocomplete, Box, Container, Grid, Paper, TextField, CardMedia, Typography, debounce } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAutoCompleatData, getCurrentWeather, getFiveDaysForecast } from '../requstService/requstService'

export default function Index() {

  const [search,setSearch] = useState(null);
  const [locations , setLocations] = useState([]);
  const [correctWeather,setCorrectWeather] = useState([])
  const [fiveDaysForecast,setFiveDaysForecast] = useState([])



    const getAutocompleteFromUserInput = async ({target})=>{
      console.log(target.value.length);
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

      getCurrentWeather(newValue?.locationKey).then((res)=>setCorrectWeather(res?.[0])) 

      getFiveDaysForecast(newValue?.locationKey).then((res)=>setFiveDaysForecast(res));
    
    
      
    } 


 
    

    

    const fixWeatherIcon = (imageIcon)=>{
      
      if (imageIcon<10) {
        return "0"+imageIcon ;
      }
      else{
        return imageIcon
      }
    }


    const imageGen = (imageIcon)=> `https://developer.accuweather.com/sites/default/files/${ fixWeatherIcon(imageIcon)}-s.png`;
    
  return (
    <Container sx={{display:"flex",width:"80vw",marginTop:"4vh",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    <Autocomplete
        sx={{width:"300px",margin:"0 auto"}}
        id="search"
        options={locations?locations:[]}
        value={search}
        getOptionLabel={(option)=>option.label}
        onChange={handleChange}
        isOptionEqualToValue={(option,value)=>option.label===value.label}
        renderInput={(params)=>(
          <TextField {...params}
          id="search"
          label="Enter your location"
          onChange={debouncedGetAutocompleteFromUserInput}
          />
        )}   
      />
      <Paper >
        <Grid container gap={1}>
          <Grid item xs={12} >
            <Paper sx={{display:"flex",alignItems:"center",flexDirection:"column" ,padding:"15px",justifyContent:"center",alignContent:"center",justifyItems:"center"}}>
              <Typography variant="h4" color="initial">{search?.label}</Typography>
              <Box sx={{display:"flex"}}>
                <CardMedia component="img" sx={{width:"20vw"}} title={correctWeather?.WeatherText} image={imageGen(correctWeather?.WeatherIcon)} />
                <Box >
                  <Typography variant="h4" color="initial">{correctWeather?.Temperature?.Metric.Value} {correctWeather?.Temperature?.Metric.Unit}</Typography>
                  <Typography variant="h4" color="initial">{correctWeather?.WeatherText}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {fiveDaysForecast?.map((day)=><Grid item xs={12} md={2} key={day?.Date}>
            <Paper sx={{display:"flex",justifyContent:"center",alignItems:"center", margin:"0 auto",height:"10vh",padding:"15px"}} >
            <CardMedia component="img" sx={{width:"50%"}} title={day?.Day?.IconPhrase} image={imageGen(day?.Day?.Icon)} />

            <Typography variant="h5" color="initial">{day?.Temperature.Maximum.Value}/{day?.Temperature.Minimum.Value}</Typography>
            </Paper>
            </Grid> )}

        </Grid>
      </Paper>
    </Container>
  )
}
