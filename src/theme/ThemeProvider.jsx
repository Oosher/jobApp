




import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

import createTheme from '@mui/material/styles/createTheme';
import   {ThemeProvider as MuiThemeProvider} from "@mui/system";

const ThemeContext = createContext();

export default function ThemeProvider({children}) {

    const [dark , setDark] = useState(false);
    const theme = createTheme({
        palette:{
            mode:dark?"dark" : "light",
        },
    });


    const toggleDarkMode = useCallback(()=>{
        setDark((prev)=>!prev);
    },[setDark])


    const value = useMemo(
        ()=>({dark,toggleDarkMode}),
        [dark,toggleDarkMode]);
    return (
        
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
        </MuiThemeProvider>
    )
}



export const useTheme = ()=>{
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a NameProvider");
    return context;
    
}