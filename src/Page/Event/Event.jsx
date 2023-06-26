import React, { useCallback, useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import './Event.scss'
import AddIcon from '../../assets/image/material-symbols_add.svg'
import SuperModal from '../../components/SuperModal/SuperModal'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import apiRoot from '../../store/apiRoot'
import Info from '../../assets/image/info-icon.svg'
import Dalate from '../../assets/image/delete-icon.svg'
import Success from '../../assets/image/success.svg'
import Cancel from '../../assets/image/ic_baseline-cancel.svg'
import { error } from '../../services/Error'
import { useTranslation } from 'react-i18next'
const Event = () => {
    const {t}  =useTranslation()
    const token = localStorage.getItem("access_token")
    const [open, setOpen] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchable, setIsSearchable] = useState(true);
    const [allname, setAllname] = useState('')
    const [eventTitle, setEventTitle] = useState('')
    const [eventMessage, setEventMessage] = useState('')
    const [eventId, setEventId] = useState([])
    const [getEvent, setGetEvent] = useState()
    const [id, setId] = useState()
    const [what, setWhat] = useState(false)
    const [eventGetId, setEventGetId] = useState()
    const [dalete, setDalete] = useState(false)
    const animatedComponents = makeAnimated();
    useEffect(() => {
        apiRoot.get(`/v1/worker/all/home`,
            {
                headers: {
                    "Authorization": `${token}`
                }
            }).then((res) => {
                setAllname(SelectDate(res?.data?.date))
            }).catch(() => {
                // error()
            })
    }, [])
    const SelectDate = (arr) => {
        const option = []
        arr?.map((item) => {
            option?.push({
                value: item?.id,
                label: item?.wname,
            })
        })
        return option;
    }
    const HandleChange = (eventId) => {
        setEventId(eventId)
    }

    const OnSubmit = (e) => {
        const workerId = eventId?.map((item) => item?.value)
        e.preventDefault();
        const data = {
            description: eventMessage,
            title: eventTitle,
            event_date: startDate,
            workers_for_event: workerId
        }
        apiRoot.post(`/v1/create/event`, data,
            {
                headers: {
                    "Authorization": `${token}`
                }
            }).then((res) => {
                console.log(res?.data);
                apiRoot.get(`/v1/events`, {
                    headers: {
                        "Authorization": `${token}`
                    }
                }).then((res) => {
                    setGetEvent(res?.data)
                }).catch(() => {
                    // error()
                })
            })
    }
    useEffect(() => {
        apiRoot.get(`/v1/events`, {
            headers: {
                "Authorization": `${token}`
            }
        }).then((res) => {
            setGetEvent(res?.data)
        }).catch(() => {
            // error()
        })
    }, [open])

    const getId = () => {
        apiRoot.get(`/v1/event/${id}`, {
            headers: {
                "Authorization": `${token}`
            }
        }).then((res) => {
            setEventGetId(res?.data)
        }).catch(() => {
            // error()
        })
    }
    // useEffect(() => {
    //     if (what) {
    //         getId()
    //     }
    // }, [what])

    const onSubmitDalete = () => {
        apiRoot.delete(`/v1/event/${id}`, {
            headers: {
                "Authorization": `${token}`
            }
        }).then((res) => {
            console.log(res?.data);
            apiRoot.get(`/v1/events`, {
                headers: {
                    "Authorization": `${token}`
                }
            }).then((res) => {
                setGetEvent(res?.data)
            }).catch(() => {
                // error()
            })
        }).catch(() => {
            // error()
        })
    }
    return (
        <div className='event_menu'>
            <Container fluid>
                <div className='add_user_page'>
                    <div className="form_group_right" onClick={() => setOpen(true)} >
                        <img src={AddIcon} alt="adda_icon" />
                        {t("event.e1")}
                    </div>
                </div>
                <Table hover>
                    <thead className='table_head'>
                        <tr>
                            <th>№</th>
                            <th>{t("event.e2")}</th>
                            <th>{t("event.e3")}</th>
                            <th>{t("event.e4")}</th>
                            <th>{t("event.e5")}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='table_body'>
                        {getEvent?.data?.map((a, b) => (
                            <tr className='body_tr' key={b}>
                                <td>
                                    <span>
                                        {++b}
                                    </span></td>
                                <td>
                                    <span>{a?.title}</span>
                                </td>
                                <td>
                                    <span>{a?.event_date.slice(0, 10)}</span>
                                </td>
                                <td>
                                    <span>{a?.worker?.length}</span>
                                </td>
                                <td>
                                    <span>
                                        {a?.event_status === false ? 
                                            <img src={Cancel} alt="cancel" />
                                            : 
                                            <img src={Success} alt="cancel" />
                                        }
                                    </span>
                                </td>
                                <td className='icon_link' >
                                    <span onClick={() => { setWhat(true); setId(a?.id) }}>
                                        <img src={Info} alt="EDIT_ICON" />
                                    </span>
                                </td>
                                <td className='icon_link' >
                                    <span onClick={() => { 
                                        setDalete(true); 
                                        setId(a?.id) 
                                        }}>
                                        <img src={Dalate} alt="dalete_icon" />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            {open && <SuperModal set={setOpen} height={"auto"} maxWidth={800} cancel={false}>
                <div className="add_user_modal">
                    <div className="title">
                        <h4>{t("event.e6")}</h4>
                    </div>
                    <form className='form_add' >
                        <div className="form_control">
                            <input
                                type="text"
                                name="text"
                                id="input"
                                placeholder='Tadbir nomi'
                                required
                                autoComplete="off"
                                onChange={(e) => setEventTitle(e.target.value)}
                            />
                        </div>
                        <div className="form_control">
                            <textarea
                                type="text"
                                name="text"
                                id="textarea"
                                rows={10}
                                placeholder='Qisqacha tadbir haqida'
                                required
                                autoComplete="off"
                                onChange={(e) => setEventMessage(e.target.value)}
                            />
                        </div>
                        <div className="form_control">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                withPortal
                                dateFormat="d  MMMM, yyyy"
                                // valueOf="2 сентября 2022"
                                className='date_picker_input'
                                showMonthDropdown
                                showYearDropdown
                            // locale={t('languages')}
                            />
                        </div>
                        <div className="form_control">
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                placeholder="Xodimlarni qo`shish"
                                // defaultValue={[allname]}
                                isLoading={isLoading}
                                isSearchable={isSearchable}
                                isMulti
                                options={allname}
                                onChange={(value) => HandleChange(value)}
                            />
                        </div>
                        <div className="btn_form">
                            <div className='add' onClick={(e) => { OnSubmit(e); setOpen(false) }}>
                                Qo‘shish
                            </div>
                            <a className='remove' onClick={() => setOpen(false)}>
                                Bekor qilish
                            </a>
                        </div>
                    </form>
                </div>
            </SuperModal>}
            {what && <SuperModal set={setWhat} height={"auto"} maxWidth={800} cancel={true}>
                <div className="add_user_modal">
                    <div className="title">
                        <h4>{t("event.e7")}</h4>
                    </div>
                    <div className="form_control">
                        <div className="title">
                            <p>{eventGetId?.title}</p>
                            <span>{t("event.e2")}</span>
                        </div>
                        <div className="title">
                            <p>{eventGetId?.description}</p>
                            <span>{t("event.e9")}</span>
                        </div>
                        <div className="title">
                            <p>{eventGetId?.event_date?.slice(0, 10)}</p>
                            <span>{t("event.e10")}</span>
                        </div>
                        <div className="worker">
                            <span>{t("event.e11")}</span>
                            {eventGetId?.worker?.map((item, index) => (
                                <p key={index}>{item?.w_name}</p>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </SuperModal>}
            {dalete && <SuperModal set={setDalete} height={"auto"} maxWidth={430} cancel={false}>
                <div className="dalete_user">
                    <div className="title">
                        <h4>{t("event.e12")}</h4>
                    </div>
                    <div className="btn_form">
                        <a className='remove' onClick={() => {
                            onSubmitDalete()
                            setDalete(false)
                        }}>
                            {t("event.e13")}
                        </a>
                        <div className='add' onClick={() => setDalete(false)}>
                        {t("event.e14")}
                        </div>
                    </div>
                </div>
            </SuperModal>}
        </div>
    )
}

export default Event