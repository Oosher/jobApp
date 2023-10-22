

import { Autocomplete, Box, Container, Grid, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAutoCompleatData, getCurrentWeather } from '../requstService/requstService'

export default function Index() {

  const [search,setSearch] = useState({});
  const [locations , setLocations] = useState([]);
  const [correntWeather,setCurrentWeather] = useState([])

    useEffect(()=>{
          getAutoCompleatData().then((res)=>setLocations(res?.data?.map((countryData,i)=>{return{key:i,label:countryData?.Country?.EnglishName+i,countryKey:countryData?.Key}}))); 
    },[])


    const handleChange = ({target})=>{
      console.log(target.value);
      setSearch(target.value)
      getCurrentWeather(search?.countryKey).then((res)=>console.log(res));
    } 
    console.log(search);
  return (
    <Container sx={{width:"fit-content"}}>
    <Autocomplete
    
        sx={{width:"300px",marginTop:"4vh"}}
        id="search"
        options={locations}
        renderInput={(params)=>(<TextField {...params}
        id="search"
        label="Enter your location"
        value={search?.label}
        onChange={handleChange}
          
        
      />)}  />
      <Paper>
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
