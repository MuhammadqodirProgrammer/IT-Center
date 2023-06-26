import React, { useState } from 'react'
import './Sidebar.scss'
import Humburger from '../../assets/image/humburger.svg'
import Statistic from '../../assets/image/6. articles.svg'
import Agent from '../../assets/image/5. agents.svg'
import Contact from '../../assets/image/4. contacts.svg'
import Svg1 from '../../assets/image/1. overview.svg'
import Ticket from '../../assets/image/2. tickets.svg'
import Idea from '../../assets/image/3. ideas.svg'
import Svg2 from '../../assets/image/a_2. subscription.svg'
import Svg3 from '../../assets/image/qurilma.svg'
import Exit from '../../assets/image/exit.svg'
import Humburger2 from '../../assets/image/hide.svg'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import Logo from '../../assets/image/astrolab-tizim-oq 1.svg'
const Sidebar = ({setOpen,drawer,setDrawer}) => {
  const {t,i18n } = useTranslation()
  const handleId = (id) =>{
    setOpen(id)
  }
  const ExitLink = () => {
    localStorage.removeItem("access_token")
    window.location.reload()
  }
  return (
    <div className='sidebar' style={{width: drawer ? "20%" : "5%"}}>
        <nav>
        <div className="title">
        {drawer && <img className='logo' src={Logo}/>}
            
            <a href="#" onClick={() => setDrawer((prev) => !prev)}>
                <img src={drawer ?  Humburger : Humburger2} alt="icon" />
            </a>
        </div>
          <ul className='side_menu'>
            <li>
              <NavLink to={'/'} onClick={() => handleId(t('aside.statistics'))}>
                <img src={Svg1} alt="icon" />
               {drawer && t('aside.statistics')}
              </NavLink>
            </li>
            {/* <li>
              <NavLink to={'/history'} onClick={() => handleId(t('aside.history'))}>
                <img src={Ticket} alt="icon" />
                {drawer && t('aside.history')}
               
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink to={'/table'} onClick={() => handleId(t('aside.table'))}>
                <img src={Idea} alt="icon" />
                {drawer && t('aside.table')}
              </NavLink>
            </li> */}
        
       
            <li>
              <NavLink to={"/worker"} onClick={() => handleId(t('aside.employe'))}>
                <img src={Agent} alt="icon" />
                {drawer && t('aside.employe')}

                
              </NavLink>
            </li>
            <li>
              <NavLink to={"/event"} onClick={() => handleId(t('aside.event'))}>
                <img src={Agent} alt="icon" />
                {drawer && t('aside.event')}
              </NavLink>
            </li>
          </ul>
          <ul className='logout_menu'>
              <li onClick={ExitLink}>
                <a href="#">
                  <img src={Exit} alt="icon" />
                  {drawer && t('aside.logOut')}
                </a>
              </li>
          </ul>

        </nav>
    </div>
    
  )
}

export default Sidebar