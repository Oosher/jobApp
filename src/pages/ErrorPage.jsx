


import React from 'react'
import { Link } from 'react-router-dom'
import ROUTS from '../routes/Routs'
import { Button, Container, Typography } from '@mui/material'


export default function ErrorPage() {
  return (
    
       <Container maxWidth="sm">
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" paragraph>
        Sorry, we couldn't find the page you're looking for.
      </Typography>
      
        <Button component={Link}  to={ROUTS.INDEX} variant="outlined" color="primary">
          Go to Home
        </Button>
      
    </Container>

  )
}
