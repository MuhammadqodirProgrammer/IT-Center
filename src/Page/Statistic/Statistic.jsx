import React, { useEffect, useState } from 'react'
import './Statistic.scss'
import update from '../../assets/image/refresh button.svg'
import ReactDatePicker from 'react-datepicker';
import CalendarImage from '../../assets/image/calendar.svg'
import Card from '../../components/Card/Card';
import { Col, Container, Row } from 'react-bootstrap';
import ChartPage from '../../components/Chart/ChartPage';
import moment from 'moment';
import Time from './Time';
import { useTranslation } from 'react-i18next';
const Statistic = () => {
  const [startDate, setStartDate] = useState(new Date());
  const {t} =useTranslation()

  return (
    <>
      <Container fluid>
        <Row>
          <div className='statistic'>
            <div className="stat_header">
              <div className="calendar_item">
                <p>{t("main.m1")}:
                </p>
                <span>
                  {moment().format()?.slice(0, 10)} |  <Time/>
                </span>
              </div>
              <div className="date_item">
                <a href="update">
                  <img src={update} alt="icon" />
                </a>
              </div>
            </div>
            <div className='time_moment'>
            {t("main.m2")}: <br /> 
              <span>08:30</span> 
            </div>
          </div>
        </Row>

      </Container >
      <Container fluid>
        <Row>
            <Card />
        </Row>
      </Container>
      <Container fluid>
            <Row>
                <Col md="8">

                </Col>
                
            </Row>
      </Container>
    </>
  )
}

export default Statistic