







import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ROUTS from './Routs.js'
import Index from '../pages/Index.jsx';
import Favorites from '../pages/Favorites.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';


export default function Router() {
    return (
    
        <Routes>
          <Route path={ROUTS.INDEX} element={<Index />} index />
          <Route path={ROUTS.FAVORITE} element={<Favorites />}  />
          <Route path={"*"} element={<ErrorPage />}  />
        </Routes>
     
    );
}
