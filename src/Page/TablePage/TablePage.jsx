import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ArrowLeft from '../../assets/image/arrow.svg';
import ArrowRight from '../../assets/image/arrow-1.svg';
import './TablePage.scss';
import DatePicker from 'react-datepicker';
import UpChevron from '../../assets/image/up_chevron.svg';
import DownChevron from '../../assets/image/down_chevron.svg';
import DownloadBtn from '../../assets/image/download_btn.svg';
import Form from 'react-bootstrap/Form';
import Calendar from '../../assets/image/calendar.svg';
import moment from 'moment';
import apiRoot from '../../store/apiRoot';
import Success from '../../assets/image/success.svg';
import { Yellow } from '../../assets/const';
import Cancel from '../../assets/image/ic_baseline-cancel.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { error } from '../../services/Error';
import { useTranslation } from 'react-i18next';
const TablePage = ({ fill }) => {
	const { t } = useTranslation();
	const token = localStorage.getItem('token');
	const [startDate, setStartDate] = useState(new Date());
	const [num, setNum] = useState(0);
	const [momentDay, setMomentDay] = useState();
	const [alldata, setAlldata] = useState();
	const arr = [];
	let g = new Date(2023, 4, 15);
	const [monday, setMonday] = useState(g);
	Date.prototype.addDays = function (days) {
		let date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};

	// console.log(new Date(moment("2023-05-15").format("dd")), "dates");

	const dayName = (day) => {
		switch (day) {
			case 1:
				return t('table.t1');
				break;
			case 2:
				return t('table.t2');
				break;
			case 3:
				return t('table.t3');
				break;
			case 4:
				return t('table.t4');
				break;
			case 5:
				return t('table.t5');
				break;
			case 6:
				return t('table.t6');
				break;
			case 0:
				return t('table.t7');
				break;
			default:
				return null;
				break;
		}
	};
	const monthName = (month) => {
		switch (month) {
			case 0:
				return t('table.t8');
				break;
			case 1:
				return t('table.t9');
				break;
			case 2:
				return t('table.t10');
				break;
			case 3:
				return t('table.t11');
				break;
			case 4:
				return t('table.t12');
				break;
			case 5:
				return t('table.t13');
				break;
			case 6:
				return t('table.t14');
				break;
			case 7:
				return t('table.t15');
				break;
			case 8:
				return t('table.t16');
				break;
			case 9:
				return t('table.t17');
				break;
			case 10:
				return t('table.t18');
				break;
			case 11:
				return t('table.t19');
				break;
			default:
				return null;
				break;
		}
	};
	for (let i = 0; i < 6; i++) {
		arr.push(monday.addDays(i));
	}
	const prev = () => {
		if (monday.addDays(-6) < new Date(moment().format())) {
			return setMonday(new Date(moment().format()));
		}
		return setMonday(monday.addDays(-7));
	};
	const next = () => {
		if (monday.addDays(6) > new Date()) {
			return setMonday(monday.addDays(6));
		}
		return setMonday(monday.addDays(7));
	};

	useEffect(() => {
		if (monday.getDay() !== 1) {
			setMonday(monday.addDays(-monday.getDay()));
		}
	}, []);

	useEffect(() => {
		setMonday(startDate);
	}, [startDate]);

	const TodayDate = moment(momentDay).format().slice(0, 10);
	const getDateUser = () => {
		apiRoot
			.get(`/v1/get/workers/${TodayDate}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setAlldata(res?.data);
				console.log(res?.data);
			})
			.catch(() => {
				error();
			});
	};
	useEffect(() => {
		getDateUser();
	}, [momentDay]);

	return (
		<div className='table_page'>
			<Container fluid>
				<Row>
					<Col md='6'>
						<div className='calendar_menu__day'>
							<button onClick={() => prev()}>
								<img src={ArrowLeft} alt='left' />
							</button>
							<div>
								<p>
									{`${monday.getDate()} - ${monday.addDays(5).getDate()}`}{' '}
									{`${monthName(monday.getMonth())}`}{' '}
									{`${monday.getFullYear()}`}
								</p>
							</div>
							<button onClick={() => next()}>
								<img src={ArrowRight} alt='right' />
							</button>
						</div>
					</Col>
					<Col md='3'>
						<div className='drop_month'>
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								withPortal
								dateFormat='d  MMMM, yyyy'
								// valueOf="2 сентября 2022"
								className='date_picker_input'
								showMonthDropdown
								showYearDropdown
								// locale={t('languages')}
							/>
							{/* <img src={Calendar} alt="" /> */}
						</div>
					</Col>
					<Col md='3'>
						<div className='download_btn'>
							<a href='/'>
								{t('table.t20')}
								<img src={DownloadBtn} alt='download' />
							</a>
						</div>
					</Col>
				</Row>
				<Row>
					<div className='tab'>
						<div className='tab_menu'>
							{arr.map((item, index) => (
								<ul
									key={index}
									className={num === index ? 'active' : 'tab_calendar_item'}
									onClick={() => {
										setNum(index);
										setMomentDay(item);
									}}
								>
									<li className='calendar_day'>
										<p>
											{item.getDate()} <br />{' '}
											<span>{monthName(item.getMonth())}</span>{' '}
										</p>
										<span>{dayName(item.getDay())}</span>
									</li>
								</ul>
							))}
						</div>
						<div className='tabs'>
							<div className='tab_content'>
								<table className='table_menu'>
									<thead className='table_head_user'>
										<tr>
											<th>№</th>
											<th scope='col-md-2' className='time'>
												{t('worker.w1')}
											</th>
											<th scope='col-md-2'>{t('table.t21')}</th>
											<th scope='col-md-3'>{t('table.t22')}</th>
											<th scope='col-md-3'>{t('table.t23')}</th>
											<th></th>
											<th scope='col-md-2'>{t('table.t24')}</th>
										</tr>
									</thead>
									<tbody className='table_body_user'>
										{
											<>
												{alldata?.data
													?.filter((item) => item?.worker_enter?.length > 0)
													?.map((item, b) => (
														<tr key={b}>
															<td scope='row'>{b + 1}</td>
															<th scope='row'>
																<img
																	src={'http://' + item?.worker_img}
																	alt=''
																/>
															</th>
															<td>{item?.worker_name}</td>
															<td>{item?.worker_enter}</td>
															<td>{item?.worker_exit}</td>
															<td>
																<OverlayTrigger
																	key='top'
																	placement='top'
																	overlay={
																		<Tooltip id={`tooltip-top`}>
																			{t('table.t25')}
																		</Tooltip>
																	}
																>
																	<div>
																		{item?.worker_status?.length > 0 && (
																			<Yellow fill={item?.worker_status} />
																		)}
																	</div>
																</OverlayTrigger>
															</td>
															<td>
																{item?.worker_exit === '~' ? (
																	<div>
																		<img src={Cancel} alt='cancel' />
																	</div>
																) : (
																	<div className='d-flex gap-1 justify-content-center'>
																		<img src={Success} alt='succes' />
																	</div>
																)}
															</td>
														</tr>
													))}
											</>
										}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default TablePage;
