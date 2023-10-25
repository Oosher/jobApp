


import React from 'react'
import { Link } from 'react-router-dom'
import ROUTS from '../routes/Routs'

export default function ErrorPage() {
  return (
    <div>
      <Link to={ROUTS.INDEX}>Go home</Link>
    </div>
  )
}
