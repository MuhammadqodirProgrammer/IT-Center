import React, { useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.scss'
const Layout = ({mode,sms,children}) => {
  const [open,setOpen] = useState('Statistika')
  const [drawer,setDrawer] = useState(true)
  return (
    <div className='layout_page' >
        <Sidebar setOpen={setOpen} drawer={drawer} setDrawer={setDrawer}/>
        <div style={{width: drawer ? "80%" : "95%", padding: "16px",position: "relative"}}>
            <Header title={open} mode={mode} sms={sms}/>   
            {children}
        </div>
    </div>
  )
}

export default Layout