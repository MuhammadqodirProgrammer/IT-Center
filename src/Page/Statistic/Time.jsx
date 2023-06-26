import moment from 'moment'
import React, { useEffect, useState } from 'react'

const Time = () => {
    const [inTime, setInTime] = useState(moment().format('LTS'))
    useEffect(()=>{
        setInTime(moment().format('LTS'))
    },[inTime])
  return (
    <div style={{marginLeft: "10px"}}>
        {inTime}
    </div>
  )
}

export default Time