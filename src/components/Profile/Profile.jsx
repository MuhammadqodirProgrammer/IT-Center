import React, { useEffect, useRef, useState } from 'react'
import UserImage from '../../assets/image/10.png'
import './Profile.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import UserIcon from '../../assets/image/Group.svg'
import Setings from '../../assets/image/Vector.svg'
import ExitSvg from '../../assets/image/Vector-1.svg'
// import jwtDecode from 'jwt-decode'
const Profile = () => {
  const {t} =useTranslation()
  const ref = useRef()
  const [open, SetOpen] = useState(false);
  const token  = localStorage.getItem("access_token")
  // const decoded = jwtDecode(token)
  const navigate = useNavigate()
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (open && ref.current && !ref.current.contains(e.target)) {
        SetOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [open])
  const handleClick = () => {
    SetOpen(prev => !prev)
  }
  return (
    <div className='profile' onClick={handleClick} ref={ref}>
        <div className='user_image'>
            {/* {decoded?.iss} {decoded?.role} */}
            Admin
            <img src={UserImage} alt="user" />
        </div>
        {
          open ?
            <div className='account_drop'>
              <div className="drop_user">
                  <img src={UserIcon} alt="" />
                  {t("profil.p1")}
              </div>
              <div className="drop_user">
                  <img src={ExitSvg} alt="" />
                  {t("profil.p2")}
              </div>
              <div className="drop_user" onClick={() => {
                localStorage.removeItem("access_token")
                window.location.reload()
              }}>
                <img src={Setings} alt="" />
                {t("profil.p3")}
              </div>
            </div>
            : null
        }
    </div>
  )
}

export default Profile