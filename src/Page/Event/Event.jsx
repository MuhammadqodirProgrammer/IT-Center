import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import './Event.scss';
import AddIcon from '../../assets/image/material-symbols_add.svg';
import SuperModal from '../../components/SuperModal/SuperModal';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import apiRoot from '../../store/apiRoot';
import Info from '../../assets/image/info-icon.svg';
import Dalate from '../../assets/image/delete-icon.svg';
import Success from '../../assets/image/success.svg';
import Cancel from '../../assets/image/ic_baseline-cancel.svg';
import { error } from '../../services/Error';
import UploadImage from '../../assets/image/upload.svg';
import Edit from '../../assets/image/Group 9.svg';

import { useTranslation } from 'react-i18next';
import MyPagination from '../../components/MyPagination/MyPagination';
const Group = () => {
	const { t } = useTranslation();
	const token = localStorage.getItem('token');
	const yonalish = useRef();
	const gr_raqam = useRef();
	const ustoz = useRef();
	const yordamchiUstoz = useRef();
	const kun = useRef();
	const vaqt = useRef();
	const hona = useRef();
	const rasm = useRef();

	// edit
	const yonalishEdit = useRef();
	const gr_raqamEdit = useRef();
	const ustozEdit = useRef();
	const yordamchiUstozEdit = useRef();
	const kunEdit = useRef();
	const vaqtEdit = useRef();
	const honaEdit = useRef();
	const rasmEdit = useRef();

	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [isLoading, setIsLoading] = useState(false);
	const [isSearchable, setIsSearchable] = useState(true);
	const [allname, setAllname] = useState('');
	const [eventTitle, setEventTitle] = useState('');
	const [eventMessage, setEventMessage] = useState('');
	const [eventId, setEventId] = useState([]);
	const [getGroup, setGetGroup] = useState();
	const [GroupOne, setGroupOne] = useState();
	const [id, setId] = useState();
	const [idDelete, setIdDelete] = useState();
	const [what, setWhat] = useState(false);
	const [eventGetId, setEventGetId] = useState();
	const [dalete, setDalete] = useState(false);
	const animatedComponents = makeAnimated();
	const [allPage, setAllPage] = useState();
	const [page, setPage] = useState(1);
	useEffect(() => {
		getGroups();
		apiRoot
			.get(`/teacher/skip=${1}/limit=${10}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setAllname(SelectDate(res?.data?.data));
				console.log(res.data.data, 'data');
			})
			.catch(() => {
				// error()
			});
	}, []);
	const SelectDate = (arr) => {
		const option = [];
		arr?.map((item) => {
			option?.push({
				value: item?._id,
				label: item?.name,
			});
		});
		return option;
	};
	const HandleChangePage = useCallback((page) => {
		setPage(page);
	}, []);
	const getGroups = () => {
		apiRoot
			.get(`/group/skip=${page}/limit=${10}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data?.data) {
					console.log(page ,"page");
					setAllPage(res.data?.total_page)
					setGetGroup(res.data?.data);
				}
			});
	};
	const OnSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		console.log(token);
		formData.append('profession', yonalish.current?.value);
		formData.append('groupNumber', gr_raqam.current?.value);
		formData.append('teacher', ustoz.current?.value);
		formData.append('days', kun.current?.value);
		formData.append('hours', vaqt.current?.value);
		formData.append('image', rasm.current?.files[0]);
		formData.append('roomName', hona.current?.value);
		formData.append('secondaryTeacherId', yordamchiUstoz.current?.value);
		console.log(yonalish.current?.value, 'rasm');
		apiRoot
			.post(`/group`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				if (res.data) {
					getGroups();
				}
			});
	};
	const OnSubmitEdit = (e) => {
		e.preventDefault();
		const formData = new FormData();

		console.log(id, 'iddd');
		console.log(GroupOne?.image, rasmEdit.current?.files[0]);
		formData.append(
			'profession',
			yonalishEdit.current?.value || GroupOne?.profession
		);
		formData.append(
			'groupNumber',
			gr_raqamEdit.current?.value || GroupOne?.groupNumber
		);
		formData.append('teacher', ustozEdit.current?.value || GroupOne?.teacher);
		formData.append('days', kunEdit.current?.value || GroupOne?.days);
		if (rasmEdit.current?.files[0]) {
			formData.append('image', rasmEdit.current?.files[0]);
		} else {
			formData.append('image', GroupOne?.image);
		}
		formData.append('hours', vaqtEdit.current?.value || GroupOne?.hours);
		formData.append('roomName', honaEdit.current?.value);
		formData.append(
			'secondaryTeacherId',
			yordamchiUstozEdit.current?.value || GroupOne?.secondaryTeacherId?._id
		);
		console.log(formData.entries());
		apiRoot
			.put(`/group/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
			});
	};
	useEffect(() => {
		apiRoot
			.get(`/group/skip=${1}/limit=${10}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setGetGroup(res.data?.data);
			})
			.catch(() => {
				// error()
			});
	}, [open]);

	const getId = () => {
		apiRoot
			.get(`/group/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				// setEventGetId(res?.data);
				setGroupOne(res.data?.data);
			})
			.catch(() => {
				// error()
			});
	};
	useEffect(() => {
		if (openEdit) {
			getId();
		}
		if(!openEdit){
			getGroups()

		}
	}, [openEdit]);

	useEffect(() => {
		getGroups()
	}, [page]);

	const onSubmitDalete = () => {
		apiRoot
			.delete(`/group/${idDelete}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res?.data);
			})
			.catch(() => {
				// error()
			});
	};
	const handleSearch = (e) => {
		e.preventDefault();
		const search = e.target?.value.toLowerCase();
		console.log(search);
		apiRoot
			.get(`/searchGroup/search=${search}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setGetGroup(res.data?.data);
			})
			.catch(() => {
				// error()
			});
	};
	return (
		<div className='event_menu'>
			<Container fluid>
				<div className='search_box'>
					<div className='form_control_search'>
						<input
							type='search'
							placeholder='Search by group number...'
							onInput={(e) => handleSearch(e)}
						/>
					</div>
					<div className='add_user_page'>
						<div className='form_group_right' onClick={() => setOpen(true)}>
							<img src={AddIcon} alt='adda_icon' />
							{t('event.e1')}
						</div>
					</div>
				</div>
				<Table hover>
					<thead className='table_head'>
						<tr>
							<th>№</th>
							<th>{t('event.e17')}</th>
							<th>{t('event.e18')}</th>
							<th>{t('event.e19')}</th>
							<th>{t('event.e20')}</th>
							<th>{t('event.e21')}</th>
							<th>{t('event.e22')}</th>
							<th>{t('event.e23')}</th>
							{/* <th>{t('event.e24')}</th> */}
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody className='table_body'>
						{getGroup?.map((a, b) => (
							<tr className='body_tr' key={b}>
								<td>
									<span>{++b}</span>
								</td>
								<td>
									<span>{a?.profession}</span>
								</td>
								<td>
									<span>{a?.groupNumber}</span>
								</td>
								<td>
									<span>{a?.teacher}</span>
								</td>
								<td>
									<span>{a?.secondaryTeacherId?.name}</span>
								</td>
								<td>
									<span>{a?.days}</span>
								</td>
								<td>
									<span>{a?.hours}</span>
								</td>
								<td>
									<span>{a?.roomName}</span>
								</td>

								<td className='icon_link'>
									<span
										onClick={() => {
											setOpenEdit(true);
											setId(a?._id);
										}}
									>
										<img src={Edit} alt='EDIT_ICON' />
									</span>
								</td>
								<td className='icon_link'>
									<span
										onClick={() => {
											setDalete(true);
											setIdDelete(a?._id);
										}}
									>
										<img src={Dalate} alt='dalete_icon' />
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				{allPage >1 && (
					<MyPagination
						total={allPage }
						current={page}
						onChangePage={HandleChangePage}
					/>
				)}
			</Container>
			{open && (
				<SuperModal set={setOpen} height={'auto'} maxWidth={800} cancel={false}>
					<div className='add_user_modal'>
						<div className='title'>
							<h4>{t('event.e6')}</h4>
						</div>
						<form className='form_add'>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e17')}
									required
									autoComplete='off'
									ref={yonalish}
								/>
							</div>
							<div className='form_control'>
								<input
									type='number'
									name='text'
									id='input'
									placeholder={t('event.e18')}
									required
									autoComplete='off'
									ref={gr_raqam}
								/>
							</div>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e19')}
									required
									autoComplete='off'
									ref={ustoz}
								/>
							</div>
							<div className='form_control'>
								{/* <input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e20')}
									required
									autoComplete='off'
									ref={yordamchiUstoz}
								/> */}
							</div>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e21')}
									required
									autoComplete='off'
									ref={kun}
								/>
							</div>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e22')}
									required
									autoComplete='off'
									ref={vaqt}
								/>
							</div>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e23')}
									required
									autoComplete='off'
									ref={hona}
								/>
							</div>
							<div className='form_control'>
								<label htmlFor='file'>{t('worker.w18')}</label>
								<input
									type='file'
									name='file'
									required
									accept='image/*'
									id='file'
									ref={rasm}
								/>
								<img src={UploadImage} alt='' />
							</div>

							<div className='form_control'>
								<select
									ref={yordamchiUstoz}
									placeholder='Yordamchi ustoz qoshish'
								>
									{allname.length
										? allname.map((el) => (
												<option style={{ color: 'black' }} value={el.value}>
													{el.label}
												</option>
										  ))
										: 'Yordamchi oqtuvchilar yoq '}
								</select>
							</div>
							<div className='btn_form'>
								<div
									className='add'
									onClick={(e) => {
										OnSubmit(e);
										setOpen(false);
									}}
								>
									Qo‘shish
								</div>
								<a className='remove' onClick={() => setOpen(false)}>
									Bekor qilish
								</a>
							</div>
						</form>
					</div>
				</SuperModal>
			)}
			{openEdit && (
				<SuperModal
					set={setOpenEdit}
					height={'auto'}
					maxWidth={800}
					cancel={false}
				>
					<div className='add_user_modal'>
						<div className='title'>
							<h4>{t('event.e6')}</h4>
						</div>
						<form className='form_add'>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e17')}
									required
									autoComplete='off'
									ref={yonalishEdit}
									defaultValue={GroupOne?.profession}
								/>
							</div>
							<div className='form_control'>
								<input
									type='number'
									name='text'
									id='input'
									placeholder={t('event.e18')}
									required
									autoComplete='off'
									ref={gr_raqamEdit}
									defaultValue={GroupOne?.groupNumber}
								/>
							</div>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e19')}
									required
									autoComplete='off'
									ref={ustozEdit}
									defaultValue={GroupOne?.teacher}
								/>
							</div>

							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e21')}
									required
									autoComplete='off'
									ref={kunEdit}
									defaultValue={GroupOne?.days}
								/>
							</div>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e22')}
									required
									autoComplete='off'
									ref={vaqtEdit}
									defaultValue={GroupOne?.hours}
								/>
							</div>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder={t('event.e23')}
									required
									autoComplete='off'
									ref={honaEdit}
									defaultValue={GroupOne?.roomName}
								/>
							</div>
							<div className='form_control'>
								<label htmlFor='file'>{t('worker.w18')}</label>
								<input
									type='file'
									name='file'
									required
									accept='image/*'
									id='file'
									ref={rasmEdit}
								/>
								<img src={UploadImage} alt='' />
							</div>

							<div className='form_control'>
								<select
									ref={yordamchiUstozEdit}
									placeholder='Yordamchi ustoz qoshish'
									defaultValue={GroupOne?.secondaryTeacherId?.name}
								>
									{allname.length
										? allname.map((el) => (
												<option style={{ color: 'black' }} value={el.value}>
													{el.label}
												</option>
										  ))
										: 'Yordamchi oqtuvchilar yoq '}
								</select>
							</div>
							<div className='btn_form'>
								<div
									className='add'
									onClick={(e) => {
										OnSubmitEdit(e);
										setOpenEdit(false);
									}}
								>
									Qo‘shish
								</div>
								<a className='remove' onClick={() => setOpenEdit(false)}>
									Bekor qilish
								</a>
							</div>
						</form>
					</div>
				</SuperModal>
			)}
			{what && (
				<SuperModal set={setWhat} height={'auto'} maxWidth={800} cancel={true}>
					<div className='add_user_modal'>
						<div className='title'>
							<h4>{t('event.e7')}</h4>
						</div>
						<div className='form_control'>
							<div className='title'>
								<p>{eventGetId?.title}</p>
								<span>{t('event.e2')}</span>
							</div>
							<div className='title'>
								<p>{eventGetId?.description}</p>
								<span>{t('event.e9')}</span>
							</div>
							<div className='title'>
								<p>{eventGetId?.event_date?.slice(0, 10)}</p>
								<span>{t('event.e10')}</span>
							</div>
							<div className='worker'>
								<span>{t('event.e11')}</span>
								{eventGetId?.worker?.map((item, index) => (
									<p key={index}>{item?.w_name}</p>
								))}
							</div>
						</div>
					</div>
				</SuperModal>
			)}
			{dalete && (
				<SuperModal
					set={setDalete}
					height={'auto'}
					maxWidth={430}
					cancel={false}
				>
					<div className='dalete_user'>
						<div className='title'>
							<h4>{t('event.e12')}</h4>
						</div>
						<div className='btn_form'>
							<a
								className='remove'
								onClick={() => {
									onSubmitDalete();
									setDalete(false);
								}}
							>
								{t('event.e13')}
							</a>
							<div className='add' onClick={() => setDalete(false)}>
								{t('event.e14')}
							</div>
						</div>
					</div>
				</SuperModal>
			)}
		</div>
	);
};

export default Group;
