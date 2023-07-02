import React, { useEffect, useState } from 'react';
import './Card.scss';
import { Col, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import apiRoot from '../../store/apiRoot';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
const Card = () => {
	const { t } = useTranslation();

	const token = localStorage.getItem('token');
	const [worker, setWorker] = useState();
	const [workerIn, setWorkerIn] = useState();
	const [workerAll, setWorkerAll] = useState();
	const [workerTop, setWorkerTop] = useState();


	return (
		<div className='tab_block'>
			
		</div>
	);
};

export default Card;
