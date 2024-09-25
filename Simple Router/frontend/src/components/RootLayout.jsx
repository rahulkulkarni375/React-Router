import React from 'react'
import { Outlet } from 'react-router-dom'
import ManiNavigation from '../components/MainNavigation'
import RootClasses from '../components/RootLayout.module.css'

export default function RootLayout() {
  return (
    <>
        <ManiNavigation />
        <main className={RootClasses.content}>
            <Outlet />
        </main>
    </>
  )
}
