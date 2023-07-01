import React, { useEffect, useState } from 'react'
import './Statistic.scss'
import update from '../../assets/image/refresh button.svg'
import ReactDatePicker from 'react-datepicker';
import CalendarImage from '../../assets/image/calendar.svg'
import Card2 from '../../components/Card2/Card2';
import {  Col, Container, Row } from 'react-bootstrap';
import ChartPage from '../../components/Chart/ChartPage';
import moment from 'moment';
import Time from './Time';
import { useTranslation } from 'react-i18next';
import Card from '../../components/Card/Card';
const StatisticTeacher = () => {
  const [startDate, setStartDate] = useState(new Date());
  const {t} =useTranslation()

  return (
    <>
   
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

export default StatisticTeacher