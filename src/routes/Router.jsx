







import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ROUTS from './Routs.js'
import Index from '../pages/Index.jsx';


export default function Router() {
    return (
      <Routes>
        <Route path={ROUTS.INDEX} element={<Index />} index />
       
      </Routes>
    );
}
