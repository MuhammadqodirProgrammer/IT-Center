import React from 'react'
import './Header.scss';
import Notification from '../Notification/Notification';
import Profile from '../Profile/Profile';
import Language from '../Lang/Language'

import { Container } from 'react-bootstrap';
import Mode from '../Mode/Mode';
import { lang } from '../../lang/lang';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'

const Header = ({mode,sms,title}) => {
   
  const {t,i18n } = useTranslation()

  return (
    <Container fluid style={{position: "sticky", top:"27px", zIndex: "9999"}}>
        <div className='header'>
            <div className="left_block">
                <h4>{title}</h4>
            </div>
            <div className="right_block d-flex gap-3">
                <div className="lang">
                    <Language/>
                </div>
                <div className="mood">
                    <Mode mode={mode}/>
                </div>
                <div className="natification">
                    <Notification sms={sms}/>
                </div>
                <div className="account">
                    <Profile/>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Header