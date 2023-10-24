


import React from 'react'
import Header from './header/Header'
import Main from './main/Main'

export default function Layout({children}) {
  return (
    <>
      <Header/>
      <Main>
        {children}
      </Main>
    </>
  )
}
