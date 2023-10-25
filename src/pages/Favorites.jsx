

import React from 'react'
import { useLocationService } from '../providers/LocationProvider'
import { CardMedia, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { removeLikedLocation } from '../localStorageService/localStorageService';
import { useTheme } from '../theme/ThemeProvider';


export default function Favorites() {

    const {likedLocations,imageGen,updateLikedLocations,isCelsius} = useLocationService();      

    const {dark} = useTheme();


    const removeFromFavorites = async (locationName) => {

        await removeLikedLocation(locationName);

        updateLikedLocations();

    }

    

    if (likedLocations?.length === 0) return<Container sx={{paddingTop:"20vh"}}> <Typography variant="h2" color="initial" textAlign="center" >There are no Liked Locations yet</Typography>
                                        </Container>
        
    

    return (
        <Container sx={{paddingTop:"3vh"}} >
            <Grid container justifyContent="center" alignItems="center" spacing={{xs:0,sm:1,md:2}}  >
                {likedLocations?.map((location)=><Grid item xs={12} sm={5} md={3} key={location.EpochTime}>   
                    <Paper>
                        <IconButton sx={{":hover":{color:"red"}}} onClick={()=>removeFromFavorites(location.name)}>
                            X
                        </IconButton>
                        <Typography variant="body1" color={dark?"white":"initial"} textAlign="center">{location.name}</Typography>

                        <CardMedia component="img"  src={imageGen(location.WeatherIcon)} />
                        <Typography variant="body1" color={dark?"white":"initial"} textAlign="center">{location.WeatherText}</Typography>
                        <Typography variant="body1" color={dark?"white":"initial"} textAlign="center">{Math.floor(isCelsius?location.Temperature.Metric.Value:location.Temperature.Imperial.Value)}&deg;{isCelsius?location.Temperature.Metric.Unit:location.Temperature.Imperial.Unit}</Typography>

                    </Paper>
                </Grid>   
                )}
            </Grid>
        </Container>
    )
}
