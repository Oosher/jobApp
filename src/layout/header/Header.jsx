




import { AppBar, Box, Button, IconButton, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '../../theme/ThemeProvider'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';
import ROUTS from '../../routes/Routs';
import CloudIcon from '@mui/icons-material/Cloud';
import "./header.css"
export default function Header() {


  const {dark,toggleDarkMode} = useTheme();

  return (
   
      <AppBar color="primary" className="appBar">
        <Toolbar className="toolBar" >
          <Box sx={{display:"flex"}}>
            <IconButton component={Link} to={ROUTS.INDEX} sx={{borderRadius:"20px"}}>
              <CloudIcon className='headerIcon' />
            
              <Typography variant="h6" className='headerTitle' >
                WeatherApp
              </Typography>
            </IconButton>
          </Box>

          <Box sx={{display:"flex",alignItems:"center"}}>

            <Button className='muiButton' component={Link} to={ROUTS.INDEX} variant="outlined"  color="inherit" >Home</Button>

            <Button className='muiButton' component={Link} to={ROUTS.FAVORITE} variant="outlined"  color="inherit">Favorites</Button>

            <Box sx={{display:"flex",alignItems:"center"}}>
              <Switch checked={dark} onChange={toggleDarkMode}/>
              {dark?<DarkModeIcon/>:<LightModeIcon sx={{color:"yellow"}}/>}
            </Box>
          </Box>
          
        </Toolbar>
      </AppBar>
    
  )
}
