import React, { useState } from 'react'
import Header from '../Header/Header'
import SidebarTeacher from '../SidebarTeacher/SidebarTeacher'
import './Layout.scss'
const LayoutTeacher = ({mode,sms,children}) => {
  const [open,setOpen] = useState('Statistika')
  const [drawer,setDrawer] = useState(true)
  return (
    <div className='layout_page' >
        <SidebarTeacher setOpen={setOpen} drawer={drawer} setDrawer={setDrawer}/>
        <div style={{width: drawer ? "80%" : "95%", padding: "16px",position: "relative"}}>
            <Header title={open} mode={mode} sms={sms}/>   
            {children}
        </div>
    </div>
  )
}

export default LayoutTeacher