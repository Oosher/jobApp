




import { AppBar, Box, Button, IconButton, Switch, Toolbar, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useTheme } from '../../theme/ThemeProvider'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';
import ROUTS from '../../routes/Routs';
import CloudIcon from '@mui/icons-material/Cloud';
import "./header.css"
import { useLocationService } from '../../providers/LocationProvider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getToggles } from '../../localStorageService/localStorageService';

export default function Header() {


  const {dark,toggleDarkMode,setDark} = useTheme();


  const {isCelsius,toggleCelsius,getGeolocation,setIsCelsius}= useLocationService();

  useEffect(()=>{

      getToggles().then((res)=>{
        if (!res?.isCelsius) {
          setIsCelsius(false);
        }
        if (res?.dark) {

          setDark(true);
          
        }
      })

  
  },[setIsCelsius,setDark])

  return (

      <AppBar color="primary" className="appBar">
        <Toolbar className="toolBar" >
          <Box sx={{display:"flex"}}>
            <IconButton component={Link} to={ROUTS.INDEX} sx={{borderRadius:"20px"}}>
              <CloudIcon className='headerIcon'/>
              <Typography variant="h6" className='headerTitle' >
                WeatherApp
              </Typography>
            </IconButton>
          </Box>

          <Box sx={{display:"flex",alignItems:"center"}}>
            <IconButton onClick={getGeolocation}>
                <LocationOnIcon/>
            </IconButton>
            <Button className='muiButton' component={Link} to={ROUTS.INDEX} variant="outlined"  color="inherit" >Home</Button>

            <Button className='muiButton' component={Link} to={ROUTS.FAVORITE} variant="outlined"  color="inherit">Favorites</Button>
            <Box>
              <Box sx={{display:"flex",alignItems:"center"}}>
                <Switch checked={dark} onChange={toggleDarkMode}/>
                {dark?<DarkModeIcon/>:<LightModeIcon sx={{color:"yellow"}}/>}
              </Box>
              <Box sx={{display:"flex",alignItems:"center"}}>
                <Switch checked={isCelsius} onChange={toggleCelsius} color="secondary"/>
                {isCelsius?<Typography variant="body1" color="white">&deg;C</Typography>:<Typography variant="body1" color="white">&deg;F</Typography>}
              </Box>
            </Box>
          </Box>
          
        </Toolbar>
      </AppBar>
    
  )
}
