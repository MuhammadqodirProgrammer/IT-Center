import React, { useEffect, useState } from 'react'
import './Card.scss'
import { Col, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import apiRoot from '../../store/apiRoot';
import { useTranslation } from 'react-i18next'

import moment from 'moment';
const Card = () => {
    const {t } = useTranslation()

    const token = localStorage.getItem("access_token")
    const [worker, setWorker] = useState()
    const [workerIn, setWorkerIn] = useState()
    const [workerAll, setWorkerAll] = useState()
    const [workerTop, setWorkerTop] = useState()
 
    const OnSubmit = () => {
        apiRoot.get(`/v1/worker/count/${moment().format().slice(0, 10)}`,
            {
                headers: {
                    "Authorization": `${token}`
                }
            }).then((res) => {
                setWorker(res?.data)
                console.log(res?.data, "sabab");
            })
    }
    const OnSubmit2 = () => {
        apiRoot.get(`/v1/get/workers/home/${moment().format().slice(0, 10)}`,
            {
                headers: {
                    "Authorization": `${token}`
                }
            }).then((res) => {
                setWorkerIn(res?.data)
                console.log(res?.data);
            })
    }
    const OnSubmit3 = () => {
        apiRoot.get(`/v1/worker/all/home`,
            {
                headers: {
                    "Authorization": `${token}`
                }
            }).then((res) => {
                setWorkerAll(res?.data)
                console.log(res?.data);
            })
    }
    const OnSubmit4 = () => {
        apiRoot.get(`/v1/worker/top`,
            {
                headers: {
                    "Authorization": `${token}`
                }
            }).then((res) => {
                setWorkerTop(res?.data)
                console.log(res?.data);
            })
    }
    useEffect(() => {
        OnSubmit()
        OnSubmit2()
        OnSubmit3()
        OnSubmit4()
    }, [])
    return (
        <div className='tab_block'>
            <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3 mt-4 gap-2"
                justify
            >
                <Tab eventKey="home" title={(
                    <div className='title'>
                       {t('card.card1')}
                        <p>
                            {worker?.countworker}
                        </p>
                    </div>

                )}   >
                    <div className='tab_content'>
                        <ul className='all_user'>
                            <div className="title">
                                <h6>{t('card.card1')}</h6>
                            </div>
                            {workerAll?.date?.map((item, index) => (
                                <li key={index}>
                                    <div className="work_img">
                                        <img src={"http://" + item?.wimg} alt="" />
                                    </div>
                                    <div className='name'>
                                        <span>{item?.wname}</span>
                                        <p>{item?.wposition} {item?.wdepartment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Tab>
                <Tab eventKey="profile" title={(
                    <div className='title'>
                       {t('card.card2')}
                        <p>
                            {worker?.atwork}
                        </p>
                    </div>
                )}>
                    <div className='tab_content'>
                        <div className="worker_list">
                            <Row>
                                <Col md="4">
                                    <ul className="atwork">
                                        <div className="title">
                                            <h6>{t('card.card2')}</h6>
                                        </div>
                                        {workerIn?.atwork?.map((item, index) => (
                                            <li key={index}>
                                                <div className="work_img">
                                                    <img src={"http://" + item?.wimg} alt="" />
                                                </div>
                                                <div className='name'>
                                                    <span>{item?.wname}</span>
                                                    <p>{item?.enex}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Col>
                                <Col md="4">
                                    <ul className="nowork">
                                        <div className="title">
                                            <h6>{t('card.card3')}</h6>
                                        </div>
                                        {workerIn?.worker?.map((item, index) => (
                                            <li key={index}>
                                                <div className="work_img">
                                                    <img src={"http://" + item?.wimg} alt="" />
                                                </div>
                                                <div className='name'>
                                                    <span>{item?.wname}</span>
                                                    <p>{item?.enex}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Col>
                                <Col md="4">
                                    <ul className="information">
                                        <li>
                                            <p>{t('card.card10')}</p>
                                            <span>{worker?.percentage}</span>
                                        </li>
                                        <li>
                                            <p>{t('card.card4')}</p>
                                            <span>{worker?.sababli}</span>
                                        </li>
                                        <li>
                                            <p>{t('card.card5')}</p>
                                            <span>{worker?.sababsiz}</span>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="longer-tab" title={(
                    <div className='title'>
                        {t('card.card6')}
                        {workerTop?.hightop?.map((item, index)=>(
                            <div key={index} className='user_about'>
                                <img className='high' src={"http://" + item?.wimg} alt="" />
                                <span>{item?.wname}</span>
                            </div>
                        ))[0]
                        }
                    </div>
                )}>
                    <div className='tab_content'>
                        <ul className='all_user'>
                            <div className="title">
                                <h6>{t('card.card7')}</h6>
                            </div>
                            {workerTop?.hightop?.map((item, index) => (
                                <li key={index} style={{backgroundColor: index === 0 && "#3ABD53"}}>
                                    <div className="work_img">
                                        <img src={"http://" + item?.wimg} alt="" />
                                    </div>
                                    <div className='name'>
                                        <span>{item?.wname}</span>
                                        <p>{item?.wposition} {item?.wdepartment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Tab>
                <Tab eventKey="contact" title={(
                    <div className='title'>
                        {t('card.card9')}
                        {workerTop?.lowtop?.map((item, index)=>(
                            <div key={index}className='user_about'>
                                <img className='low' src={"http://" + item?.wimg} alt="" />
                                <span>{item?.wname}</span>
                            </div>
                        ))[0]
                        }
                    </div>
                )}>
                     <div className='tab_content'>
                        <ul className='all_user'>
                            <div className="title">
                                <h6>{t('card.card8')}</h6>
                            </div>
                            {workerTop?.lowtop?.map((item, index)=>(
                                <li key={index} style={{backgroundColor: index === 0 && "#A12429"}}>
                                    <div className="work_img">
                                        <img src={"http://" + item?.wimg} alt="" />
                                    </div>
                                    <div className='name'>
                                        <span>{item?.wname}</span>
                                        <p>{item?.wposition} {item?.wdepartment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Card