import React, { useCallback, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import AddIcon from '../../assets/image/material-symbols_add.svg'
import Table from 'react-bootstrap/Table';
import './Worker.scss'
import Edit from '../../assets/image/Group 9.svg'
import Dalate from '../../assets/image/Group 10.svg'
import UploadImage from '../../assets/image/upload.svg'
import InputMask from 'react-input-mask'
import apiRoot from '../../store/apiRoot';
import axios from 'axios';
import SuperModal from '../../components/SuperModal/SuperModal';
import Lock from '../../assets/image/lock (1).png'
import SMS from '../../assets/image/message-text.svg'
import { useNavigate } from 'react-router-dom';
import MyPagination from '../../components/MyPagination/MyPagination';
import { error } from '../../services/Error';
import { useTranslation } from 'react-i18next';
const Worker = () => {
  const {t} =useTranslation()
  const token = localStorage.getItem("access_token")
  const [open, setOpen] = useState(false)
  const [getImage, setGetImage] = useState()
  const [page, setPage] = useState(1)
  // upload
  const [imgUpload, setImgUpload] = useState("")
  const [fio, setFio] = useState("")
  const [position, setPosition] = useState("")
  const [department, setDepartment] = useState("")
  const [phone, setPhone] = useState("")
  const [user, setUser] = useState("")
  const [postUser, setPostUser] = useState("")
  const [edit, setEdit] = useState(false)
  const [dalete, setDalete] = useState(false)
  const [id, setId] = useState()
  const [getId, setGetId] = useState()
  const [changeimg, setChangeimg] = useState()
  const [changefio, setChangefio] = useState("")
  const [changeposition, setChangeposition] = useState("")
  const [changedepartment, setChangedepartment] = useState("")
  const [changephone, setChangephone] = useState("")
  const [render, setRender] = useState(false)
  const [code, setCode] = useState(false)
  const [psw, setPws] = useState()
  const [unId, setUnId] = useState()
  const [remove, setRemove] = useState()
  const [time, setTime] = useState()
  const [time1, setTime1] = useState("")
  // const [startTime,  setStartTime] = useState("")
  const [num, setNum] = useState("");
  const [num2, setNum2] = useState("");
  const navigate = useNavigate()


  const handleSubmit1 = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    apiRoot.post(`/v1/file-upload`, formData, { headers: { "Authorization": `${token}` } }).then((res) => setGetImage(res?.data))
  }
  const handleSubmit2 = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    apiRoot.post(`/v1/file-upload`, formData, { headers: { "Authorization": `${token}` } }).then((res) => setImgUpload(res?.data))
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      wcontact: phone?.replace(/[^0-9]/g, ""),
      wdepartment: department,
      wimg: getImage?.url,
      wname: fio,
      wposition: position,
      w_come_time: num + ":" + num2
    }
    console.log(getImage, "url");
    apiRoot.post('v1/create/worker', data,
      {
        headers: {
          "Authorization": `${token}`
        }
      },
    )
      .then((res) => {
        setPostUser(res?.data)
        setRender((prev) => !prev)
      }).catch((err)=>{
        // if(err?.data?.status === 401){
        //   error()
        // }
      })
  }

  const GetUser = () => {
    apiRoot.get(`/v1/worker/all/list?page=${page}&limit=${10}`,
      {
        headers: {
          "Authorization": `${token}`
        }
      }).then((res) => {
        setUser(res?.data)
      }).catch(() => {
        // error()
      })
  }
  const GetIdUser = (ids) => {
    apiRoot.get(`/v1/worker/${ids}`,
      {
        headers: {
          "Authorization": `${token}`
        }
      }).then((res) => {
        setGetId(res?.data)
        setId(res?.data?.id)
        setChangefio(res?.data?.wname)
        setChangeimg(res?.data?.wimg)
        setChangeposition(res?.data?.wposition)
        setChangedepartment(res?.data?.wdepartment)
        setChangephone(res?.data?.wcontact)
        setUnId(res?.data?.wunique_id)
        setPws(res?.data?.wpassword)
        setTime(res?.data?.w_come_time)
      }).catch((err) => {
        console.log(err);
        // error()
      })
  }


  const onSubmitUpdate = (e) => {
    e.preventDefault();
    const data = {
      id: id,
      wcontact: changephone?.replace(/[^0-9]/g, ""),
      wdepartment: changedepartment,
      wposition: changeposition,
      wimg: imgUpload?.url,
      wname: changefio,
      w_come_time: time?.slice(0, 2) + ":" + time1,
    }
    apiRoot.put(`/v1/worker`, data,
      {
        headers: {
          "Authorization": `${token}`
        }
      }).then((res) => {
        setRender((prev) => !prev)
        setImgUpload('')
      }).catch(()=>{
        // error()
      })
  }

  const onSubmitDalete = () => {
    apiRoot.delete(`/v1/worker/${id}`, {
      headers: {
        "Authorization": `${token}`
      }
    }).then((res) =>
      setRemove(res?.data),

    ).catch(()=>{
      // error()
    })
  }
  const GetMessage = (id) => {
    apiRoot.get(`/v1/message/worker/${id}`,
      {
        headers: {
          "Authorization": `${token}`
        }
      }).then((res) => {
        navigate(`/message/${id}`)
      }).catch((err) => {
        // error()
      })
  }
  useEffect(() => {
    GetUser()
    // GetIdUser()
  }, [open, id, render, remove,page])



  const HandleChangePage = useCallback((page) => {
    setPage(page)
  }, [])
  user?.data?.workers?.sort((a, b) => a?.wname?.localeCompare(b?.wname))
  return (
    <div className='worker_section'>
      <Container fluid>
        <form action="" className='add_user_page'>
          <div className="form_group_right" onClick={() => setOpen(true)} >
            <img src={AddIcon} alt="adda_icon" />
            Xodim qo‘shish
          </div>
        </form>
        <Table hover>
          <thead className='table_head'>
            <tr>
              <th>№</th>
              <th>{t("worker.w1")}</th>
              <th>{t("worker.w2")}</th>
              <th>{t("worker.w3")}</th>
              <th>{t("worker.w4")}</th>
              <th>{t("worker.w5")}</th>
              <th>{t("worker.w6")}</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='table_body'>
            {user?.data?.workers?.sort((a, b) => a?.wname?.localeCompare(b?.wname))?.map((a, b) => (
              <tr className='body_tr' key={b}>
                <td>
                  <span>{(page - 1) * 10 + (b + 1)}</span>
                </td>
                <td className='avatar_image'>
                  <img src={"http://" + a?.wimg} alt="avatar" />
                </td>
                <td>
                  <span>{a?.wname}</span>
                </td>
                <td>
                  <span>{a?.wdepartment}</span>
                </td>
                <td>
                  <span>{a?.wposition}</span>
                </td>
                <td>
                  <span>+{a?.wcontact}</span>
                </td>
                <td>
                  <span>{a?.w_come_time}</span>
                </td>
                <td className='icon_link' >
                  <span onClick={() => {
                    GetMessage(a?.id);
                    setId(a?.id)

                  }} className='sms_icon'>
                    <img src={SMS} alt="Lock_ICON" />
                  </span>
                </td>
                <td className='icon_link' >
                  <span onClick={() => {GetIdUser(a?.id); setCode(true) }} className='lock_icon'>
                    <img src={Lock} alt="Lock_ICON" />
                  </span>
                </td>
                <td className='icon_link' >
                  <span onClick={() => { setEdit(true); GetIdUser(a?.id) }}>
                    <img src={Edit} alt="EDIT_ICON" />
                  </span>
                </td>
                <td className='icon_link' >
                  <span onClick={() => { setDalete(true); GetIdUser(a?.id) }}>
                    <img src={Dalate} alt="dalete_icon" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {
          user?.total_page > 1 && (
            <MyPagination
              total={user?.total_page}
              current={page}
              onChangePage={HandleChangePage}
            />
          )
        }
      </Container>
      {open && <SuperModal set={setOpen} height={"auto"} maxWidth={530} cancel={false}>
        <div className="add_user_modal">
          <div className="title">
            <h4>{t("worker.w7")}</h4>
          </div>
          <form className='form_add' >
            {getImage &&
              <div className="active_img">
                <img src={"http://" + getImage?.url} alt="" />
              </div>
            }
            <div className="form_control">
              <input
                type="text"
                name="text"
                id="fio"
                placeholder='FIO'
                required
                onChange={(e) => setFio(e.target.value)}
              />
            </div>
            <div className="form_control">
              <input
                type="text"
                name="text"
                required
                id="section"
                placeholder={t("worker.w3")}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="form_control">
              <input
                type="text"
                name="text"
                required
                id="text_work"
                placeholder={t("worker.w4")}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="form_control">
              <InputMask
                type="text"
                name='number'
                placeholder={t("worker.w5")}
                onChange={(e) => setPhone(e.target.value)}
                required
                mask="+\9\9\8\(99) 999-99-99"
                maskChar=" "
                autoComplete="off"
              />
            </div>
            <div className="form_control">
              <label htmlFor="file"  >
              {t("worker.w18")}
              </label>
              <input
                type="file"
                name="file"
                required
                accept="image/*"
                onChange={handleSubmit1}
                id="file"
              />
              <img src={UploadImage} alt="" />
            </div>
            <div className="form_control_table">
              <label>{t("worker.w8")}</label>
              <div className='d-flex'>
                <input
                  type="text"
                  placeholder="00"
                  maxLength={2}
                  onChange={(e) => setNum(e.target.value)}
                  value={num}
                  className={num ? "active" : null}
                  required
                />
                <span>:</span>
                <input
                  type="text"
                  placeholder="00"
                  maxLength={2}
                  onChange={(e) => setNum2(e.target.value)}
                  value={num2}
                  className={num2 ? "active" : null}
                  required
                />
              </div>
            </div>
            <div className="btn_form">
              <div className='add' onClick={(e) => { onSubmit(e); setOpen(false) }}>
              {t("worker.w9")}
              </div>
              <a className='remove' onClick={() => setOpen(false)}>
              {t("worker.w10")}
              </a>
            </div>
          </form>
        </div>
      </SuperModal>}
      {edit && <SuperModal set={setEdit} height={"auto"} maxWidth={590} cancel={false}>
        <div className="add_user_modal">
          <div className="title">
            <h4>{t("worker.w11")}</h4>
          </div>
          <form className='form_add' >
            <div className="active_img">
              {
                imgUpload === "" ?

                  <img src={"http://" + changeimg} alt="" />
                  :
                  <img src={"http://" + imgUpload?.url} alt="" />
              }
            </div>
            <div className="form_control">
              <input
                type="text"
                name="text"
                id="fio"
                placeholder='FIO'
                required
                onChange={(e) => setChangefio(e.target.value)}
                value={changefio}
              />
            </div>
            <div className="form_control">
              <input
                type="text"
                name="text"
                required
                id="section"
                placeholder={t("worker.w3")}
                onChange={(e) => setChangedepartment(e.target.value)}
                value={changedepartment}

              />
            </div>
            <div className="form_control">
              <input
                type="text"
                name="text"
                required
                id="text_work"
                placeholder={t("worker.w4")}
                onChange={(e) => setChangeposition(e.target.value)}
                value={changeposition}
              />
            </div>
            <div className="form_control">
              <InputMask
                type="text"
                name='number'
                placeholder={t("worker.w5")}
                onChange={(e) => setChangephone(e.target.value)}
                required
                mask="+\9\9\8\(99) 999-99-99"
                maskChar=" "
                autoComplete="off"
                value={changephone}
              />
            </div>
            <div className="form_control d-flex">

              <label htmlFor="file">
              {t("worker.w18")}
              </label>
              <input
                type="file"
                name="file"
                required
                accept="image/*"
                onChange={handleSubmit2}
                id="file"
              />
              <img src={UploadImage} alt="" />
            </div>

            <div className="form_control_table">
              <label>{t("worker.w12")}</label>
              <div className='d-flex'>
                <input
                  type="text"
                  placeholder="00"
                  maxLength={2}
                  min="24"
                  onChange={(e) => setTime(e.target.value)}
                  value={time?.slice(0, 2)}
                  className={num ? "active" : null}
                  required
                />
                <span>:</span>
                <input
                  type="text"
                  placeholder="00"
                  maxLength={2}
                  min="60"
                  onChange={(e) => setTime1(e.target.value)}
                  value={time1.length > 0 ? time1 : time?.slice(3, 5)}
                  className={num2 ? "active" : null}
                  required
                />
              </div>
            </div>
            <div className="btn_form">
              <div className='add' onClick={(e) => { onSubmitUpdate(e); setEdit(false) }}>
              {t("worker.w13")}
              </div>
              <a className='remove' onClick={() => setEdit(false)}>
              {t("worker.w10")}
              </a>
            </div>
          </form>
        </div>
      </SuperModal>}
      {dalete && <SuperModal set={setDalete} height={350} maxWidth={530} cancel={false}>
        <div className="dalete_user">
          <div className="title">
            <h4>{t("worker.w14")}</h4>
          </div>
          <div className="dalete_about">
            <img src={"http://" + changeimg} alt="image" />
            <p>{changefio}</p>
          </div>
          <div className="btn_form">
            <a className='remove' onClick={() => {
              onSubmitDalete()
              setDalete(false)
            }}>
              {t("worker.w15")}
            </a>
            <div className='add' onClick={() => setDalete(false)}>
            {t("worker.w16")}
            </div>
          </div>
        </div>
      </SuperModal>}
      {code && <SuperModal set={setCode} height={350} maxWidth={530} cancel={true} >
        <div className="dalete_user">
          <div className="title">
            <h4>{t("worker.w17")}</h4>
          </div>
          <div className="dalete_about">
            <img src={"http://" + changeimg} alt="image" />
            <p>{changefio}</p>
            <div className="psw">
              <p>Id: <span>{unId}</span></p>
              <p>Parol: <span> {psw}  </span> </p>
            </div>
          </div>
        </div>
      </SuperModal>}
    </div>
  )
}

export default Worker

