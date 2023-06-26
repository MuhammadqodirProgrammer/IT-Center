import React, { useEffect, useState } from 'react'
import './Message.scss'
import { Container } from 'react-bootstrap'
import ArrowLeft from '../../assets/image/arrow-left.svg'
import apiRoot from '../../store/apiRoot'
import { useParams } from 'react-router-dom'
import { error } from '../../services/Error'
const Message = () => {
    const param = useParams()
    console.log(param, "param");
    const [getUser, setGetUser] = useState()
    const [list, setList] = useState()
    const token = localStorage.getItem("access_token")
    const GetMessage = () => {
        apiRoot.get(`/v1/message/worker/${param?.id}`,
            {
              headers: {
                "Authorization": `${token}`
              }
            }).then((res) => {
                setList(res?.data)
            }).catch(() => {
               error()
            })
      }
      const GetIdUser = () => {
        apiRoot.get(`/v1/worker/${param?.id}`,
          {
            headers: {
              "Authorization": `${token}`
            }
          }).then((res) => {
            setGetUser(res?.data)
          }).catch(() => {
            error()
          })
      }
      useEffect(()=>{
        GetIdUser()
        GetMessage()
      }, [])
  return (
        <Container fluid>
          <div className="message_list">
            <div className='message_list_header'>
                    <div className="title">
                        <div className="image_title">
                          <img src={"http://"+ getUser?.wimg} alt="" /> 
                        </div>
                        <div className="user_title">
                            <h4>{getUser?.wname}</h4>
                            <p>{getUser?.wdepartment} {getUser?.wposition}</p>
                            <p>+{getUser?.wcontact}</p>
                        </div>
                    </div>
                    <div className="user_work_time">
                        <p>Ishga kelish vaqti : {getUser?.w_come_time}</p>
                    </div>
            </div>
          </div>
          <div className="message_list_body">
              <div className="title">
                <h4>Xabarlar :</h4>
              </div>
          </div>
          {list?.data?.map((item, index)=> (
            <div className="message_list_item" key={index}>
                <div className="sms">
                   <p>{item?.message}</p> 
                   <span>{item?.from_day?.slice(0, 10)} - {item?.to_day?.slice(0, 10)}</span>
                </div>
                <div className="sms_time">
                    <p>{item?.created_at}</p>
                    {item?.status === "cancel" ? 
                      <span style={{color : "red"}}>{item?.status}</span>
                      :
                      <span>{item?.status}</span>
                    }
                </div>
            </div>
          ))
          }
        </Container>
  )
}

export default Message