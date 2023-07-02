import React, { useEffect, useRef } from 'react'
import uz from '../../assets/image/language.svg'
import en from '../../assets/image/engFlag.png'
import ru from '../../assets/image/russia-flag.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Language = () => {
  const {i18n } = useTranslation()
  const activeLang =i18n.language

useEffect(()=>{
  localStorage.setItem("lang" ,activeLang)
},[activeLang])

  return (
    <div className='lang d-flex gap-3' >
        <div onClick={(e)=>i18n.changeLanguage("uz")} >
        {
          activeLang =="uz" ? (<img className="flag"  src={uz} alt="flag"  />):<img className="flag"  src={uz} alt="flag" style={{ opacity:"0.5"}} />
        }
            
        </div>
        <div onClick={(e)=>i18n.changeLanguage("ru")} >
        {
          activeLang =="ru" ? (<img className="flag"  src={ru} alt="flag" width='24' height='17' style={{borderRadius:"4px"}}  />):<img className="flag"  src={ru} alt="flag" style={{ opacity:"0.5" ,borderRadius:"4px"}} width='24' height='17' />
        }
        </div>
        <div onClick={(e)=>i18n.changeLanguage("en")} >
        {
          activeLang =="en" ? (<img className="flag" src={en} alt="flag"  width='24' height='17' style={{borderRadius:"4px"}} />):<img className="flag" src={en} alt="flag"  width='24' height='17' style={{borderRadius:"4px" ,opacity:"0.5"}} />
        }
            
        </div>
    </div>
  )
}

export default Language