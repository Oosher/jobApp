


import { Box } from '@mui/material'
import React from 'react'
import { useTheme } from '../../theme/ThemeProvider';

export default function Main({children}) {
    const {dark} =useTheme();
  return (
    <Box sx={{
        bgcolor:dark?"darkgray":"white",
        minHeight: {
            xs: `calc(100vh - 56px)`, 
            sm: `calc(100vh - 64px)`, 
    },
    marginTop:"0"
    }}>
        {children}
    </Box>
  )
}
