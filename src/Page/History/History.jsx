import React, { useEffect, useState } from 'react';
import './History.scss';
import { Container } from 'react-bootstrap';
import DownloadBtn from '../../assets/image/download_btn.svg';
import DatePicker from 'react-datepicker';
import apiRoot from '../../store/apiRoot';
import moment from 'moment';
import { error } from '../../services/Error';
import { useTranslation } from 'react-i18next';
const month = [
	{
		name: 'Yanvar',
		id: 1,
		end: 'January',
	},
	{
		name: 'Fevral',
		id: 2,
		end: 'February',
	},
	{
		name: 'Mart',
		id: 3,
		end: 'March',
	},
	{
		name: 'Aprel',
		id: 4,
		end: 'Aprel',
	},
	{
		name: 'May',
		id: 5,
		end: 'May',
	},

	{
		name: 'Iyun',
		id: 6,
		end: 'June',
	},
	{
		name: 'Iyul',
		id: 7,
		end: 'July',
	},
	{
		name: 'Avgust',
		id: 8,
		end: 'August',
	},
	{
		name: 'Sentabr',
		id: 9,
		end: 'September',
	},
	{
		name: 'Oktabr',
		id: 10,
		end: 'Octobek',
	},
	{
		name: 'Noyabr',
		id: 11,
		end: 'November',
	},
	{
		name: 'Dekabr',
		id: 12,
		end: 'December',
	},
];
const History = () => {
	const { t } = useTranslation();
	const token = localStorage.getItem('token');
	const dv = moment().format('MMMM');
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [monthDate, setMonthDate] = useState(false);
	const [monthValue, setMonthValue] = useState(
		month.filter((item) => item?.end === dv)[0]?.id
	);
	const [getValue, setGetValue] = useState();
	const [day, setDay] = useState();
	const firstday = moment(startDate).format().slice(0, 10);
	const lastday = moment(endDate).format().slice(0, 10);
	const [pdf, setPdf] = useState('');
	const HandleValue = (value) => {
		if (value) {
			const id = month.filter((item) => item?.end === value?.target.value)[0]
				?.id;
			setMonthValue(id);
		}
	};
	const year = moment().format('YYYY [escaped] YYYY')?.slice(0, 4);
	const downloadFile = () => {
		apiRoot
			.get(`/v1/download/${year}-${monthValue}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res?.data?.url);
				setPdf(res?.data?.url);
			})
			.catch(() => {
				error();
			});
	};
	useEffect(() => {
		downloadFile();
	}, []);
	const onSubmit = () => {
		if (!monthDate) {
			apiRoot
				.get(`/v1/worker/month/${year}-${monthValue}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setGetValue(res?.data);
					console.log(res?.data, 'vale');
				})
				.catch(() => {
					error();
				});
		}
	};
	const onSubmit2 = () => {
		apiRoot
			.get(`/v1/worker/two_date/${firstday}/${lastday}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setGetValue(res?.data);
				console.log(res?.data, 'kunlar');
			})
			.catch((err) => {
				console.log(err);
				error();
			});
	};
	useEffect(() => {
		onSubmit();
		onSubmit2();
	}, [monthValue, monthDate]);

	console.log(dv);

	const [defoultMonth, setDefoultMonth] = useState(
		month.filter((item) => item?.end === dv)[0]?.name
	);
	console.log(defoultMonth, 'what');

	return (
		<div className='history'>
			<Container fluid>
				<div className='history_header'>
					<form action='/'>
						<div className='form_group'>
							<input
								type='checkbox'
								id='check1'
								name='month'
								checked={!monthDate}
								onChange={() => setMonthDate((prev) => !prev)}
							/>
							<label htmlFor='check1'>{t('history.h1')}</label>
						</div>
						<div className='form_group'>
							<input
								type='checkbox'
								id='check2'
								name='date'
								checked={monthDate}
								onChange={() => {
									setMonthDate((prev) => !prev);
									setGetValue([]);
								}}
							/>
							<label htmlFor='check2'>{t('history.h2')}</label>
						</div>
						<div className='form_month'>
							{!monthDate && (
								<select onChange={HandleValue} defaultValue={{ defoultMonth }}>
									{/* <option>{month.filter(item => item?.end === dv)[0]?.name}</option> */}
									{month?.map((item, index) => (
										<option key={index} value={item?.end} selected='selected'>
											{item?.name}
										</option>
									))}
								</select>
							)}
						</div>
						<div className='form_date'>
							{monthDate && (
								<DatePicker
									selectsRange={true}
									startDate={startDate}
									endDate={endDate}
									onChange={(update) => {
										setDateRange(update);
									}}
									isClearable={false}
									placeholderText={t('history.h3')}
									showMonthDropdown
									showYearDropdown
								/>
							)}
						</div>
					</form>
					<div className='download_btn' onClick={downloadFile}>
						<a href={'https://' + pdf} download={'media.pdf'}>
							{t('table.t20')}
							<img src={DownloadBtn} alt='download' />
						</a>
					</div>
				</div>
				<div className='history_table'>
					<table className='table_menu'>
						<thead className='table_head_user'>
							<tr>
								<th scope='col-md-2' className='time'>
									{t('worker.w1')}
								</th>
								<th scope='col-md-2'>{t('table.t21')}</th>
								<th scope='col-md-3'>{t('history.h4')}</th>
								<th scope='col-md-3'>{t('history.h5')}</th>
								<th scope='col-md-2'>{t('history.h6')}</th>
								<th scope='col-md-2'>{t('history.h7')}</th>
							</tr>
						</thead>
						<tbody className='table_body_user'>
							{
								<>
									{getValue?.data?.map((item, index) => (
										<tr key={index}>
											<th scope='row'>
												<img src={'http://' + item?.wimg} alt='' />
											</th>
											<td>{item?.wname}</td>
											<td>{item?.wday}</td>
											<td>{item?.wenterave}</td>
											<td>{item?.wexitave}</td>
											<td>{item?.wtime}</td>
										</tr>
									))}
								</>
							}
						</tbody>
					</table>
				</div>
			</Container>
		</div>
	);
};

export default History;
