import React from 'react'
import Page404 from '../../assets/image/404 webpage.svg'
import './page404.scss'
import Logo from '../../assets/image/logo.png'
const PageNotFound = () => {
  const BackTo = () => {
    sessionStorage.removeItem("err")
    window.location.reload();
  }
  return (
    <div className='page_404'>
        <div className="logo">
            <img src={Logo} alt="" />
        </div>
        <img src={Page404} alt="" />
        <button className="btn_404" onClick={BackTo}>
            Back to
        </button>
    </div>
  )
}

export default PageNotFound