import React from 'react'
import Dark from '../../assets/image/dark.svg'
import Light from '../../assets/image/light.svg'
import './Mode.scss'
const Mode = ({mode}) => {

  return (
    <div className='mood'>
        <div className="darks">
            <img src={Dark} alt="dark" onClick={mode} />  
        </div>
        <div className="lights">
            <img src={Light} alt="dark" onClick={mode}/>    
        </div>
    </div>
  )
}

export default Mode