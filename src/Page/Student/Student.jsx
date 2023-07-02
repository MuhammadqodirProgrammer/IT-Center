import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import AddIcon from '../../assets/image/material-symbols_add.svg';
import Table from 'react-bootstrap/Table';
import '../Worker/Worker.scss';
import Edit from '../../assets/image/Group 9.svg';
import Dalate from '../../assets/image/Group 10.svg';
import UploadImage from '../../assets/image/upload.svg';
import Lock from '../../assets/image/lock (1).png';
import InputMask from 'react-input-mask';
import apiRoot from '../../store/apiRoot';
import axios from 'axios';
import SuperModal from '../../components/SuperModal/SuperModal';
import SMS from '../../assets/image/message-text.svg';
import { useNavigate } from 'react-router-dom';
import MyPagination from '../../components/MyPagination/MyPagination';
import { error } from '../../services/Error';
import { useTranslation } from 'react-i18next';
const Student = () => {
	const { t } = useTranslation();
	const token = localStorage.getItem('token');
	const [open, setOpen] = useState(false);
	const [getImage, setGetImage] = useState();
	const [page, setPage] = useState(1);
	// upload
	const [imgUpload, setImgUpload] = useState('');
	const [fio, setFio] = useState('');
	const [position, setPosition] = useState('');
	const [department, setDepartment] = useState('');
	const [phone, setPhone] = useState('');
	const [user, setUser] = useState('');
	const [postUser, setPostUser] = useState('');
	const [edit, setEdit] = useState(false);
	const [dalete, setDalete] = useState(false);
	const [id, setId] = useState();
	const [updateid, setupdateId] = useState();
	const [getId, setGetId] = useState();
	const [changeimg, setChangeimg] = useState();
	const [changeSurname, setChangeSurname] = useState();
	const [changeAge, setChangeAge] = useState();
	const [changeGender, setChangeGender] = useState();
	const [changefio, setChangefio] = useState('');
	const [changeposition, setChangeposition] = useState('');
	const [changepositionId, setChangepositionId] = useState('');
	const [changedepartment, setChangedepartment] = useState('');
	const [changephone, setChangephone] = useState('');
	const [render, setRender] = useState(false);
	const [code, setCode] = useState(false);
	const [psw, setPws] = useState();
	const [unId, setUnId] = useState();
	const [remove, setRemove] = useState();

	const navigate = useNavigate();

	const nameRef = useRef();
	const surnameRef = useRef();
	const jinsRef = useRef();
	const imageRef = useRef();
	const phoneRef = useRef();
	const tgUserNameRef = useRef();
	const ageRef = useRef();
	const yonalishRef = useRef();
	const groupSelect = useRef();
	const groupSelectEdit = useRef();
	const [allPage, setAllPage] = useState();

	const [allname, setAllname] = useState('');

	useEffect(() => {
		apiRoot
			.get(`/group/skip=${1}/limit=${10}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setAllname(SelectDate(res?.data?.data));
				
				console.log(res.data, 'dataaaaaaaaaaa');
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
				label: item?.profession + ' N' + item?.groupNumber,
			});
		});
		return option;
	};

	const GetUser = () => {
		apiRoot
			.get(`/student/skip=${page}/limit=${10}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setAllPage(res.data?.total_page)
				console.log(res.data);
				setUser(res.data?.data);
			})
			.catch(() => {
				// error()
			});
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const phoneNumber = (phoneRef.current?.value)
			.replaceAll('-', '')
			.replaceAll(' ', '')
			.replaceAll('(', '')
			.replaceAll(')', '');

		const formData = new FormData();
		console.log(token);
		formData.append('name', nameRef.current?.value);
		formData.append('surname', surnameRef.current?.value);
		formData.append('age', ageRef.current?.value);
		formData.append('groupId', groupSelect.current?.value);
		formData.append('phoneNumber', phoneNumber);
		formData.append('image', imageRef.current?.files[0]);
		formData.append('telegramUsername', tgUserNameRef.current?.value);
		formData.append('jins', jinsRef.current?.value);
		console.log(
			nameRef.current?.value,
			surnameRef.current?.value,
			ageRef.current?.value,
			groupSelect.current?.value,
			phoneRef.current?.value,
			imageRef.current?.files[0],
			tgUserNameRef.current?.value
		);
		apiRoot
			.post(`/student`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				if (res.data?.data) {
					GetUser();
				}
			});
	};
	const GetIdUser = (ids) => {
		console.log(ids, 'id');
		setupdateId(ids);
		apiRoot
			.get(`/student/${ids}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data.data);

				setGetId(res?.data?.data);
				setId(res?.data?.data?._id);
				setChangefio(res?.data?.data?.name);

				setChangeSurname(res?.data?.data?.surname);
				setChangeAge(res?.data?.data?.age);
				setChangeGender(res?.data?.data?.jins);

				setChangeimg(res.data?.data?.image);
				setChangeposition(res?.data?.data?.groupId?.profession);
				// setChangepositionId(res?.data?.data?.groupId?._id);
				setChangedepartment(res?.data?.data?.telegramUsername);
				setChangephone(res?.data?.data?.phoneNumber);
				setUnId(res?.data?.data?.telegramUsername);
				setPws(res?.data?.data?.phoneNumber);
			})
			.catch((err) => {
				// console.log(err);
				// error()
			});
	};
	// GetIdUser()
	const onSubmitUpdate = (e) => {
		e.preventDefault();
		const formData = new FormData();
		const phoneNumber = changephone
			.replaceAll('-', '')
			.replaceAll(' ', '')
			.replaceAll('(', '')
			.replaceAll(')', '');

		formData.append('name', changefio);
		formData.append('surname', changeSurname);
		formData.append('age', changeAge);
		formData.append(
			'groupId',
			groupSelectEdit.current?.value || changeposition
		);
		formData.append('phoneNumber', phoneNumber);
		formData.append('image', changeimg);
		formData.append('telegramUsername', changedepartment);
		formData.append('jins', changeGender);
		console.log(changeimg);
		console.log(id, 'id', typeof id);
		apiRoot
			.put(`/student/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				if (res.data) {
					GetUser();
				}
			});
	};

	const onSubmitDalete = () => {
		apiRoot
			.delete(`/student/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => setRemove(res?.data))
			.catch(() => {
				// error()
			});
	};

	useEffect(() => {
		GetUser();
		GetIdUser(updateid);
	}, [open, id, render, remove, page]);
	useEffect(() => {}, [edit]);

	const HandleChangePage = useCallback((page) => {
		setPage(page);
	}, []);
	const handleSearch = (e) => {
		e.preventDefault();
		const search = e.target?.value.toLowerCase();
		console.log(search);
		apiRoot
			.get(`/searchStudent/search=${search}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setUser(res.data?.data);
			})
			.catch(() => {
				// error()
			});
	};
	// user?.data?.workers?.sort((a, b) => a?.wname?.localeCompare(b?.wname));
	return (
		<div className='worker_section'>
			<Container fluid>
				<div className='search_box'>
					<div className='form_control_search'>
						<input
							type='search'
							placeholder='Search...'
							required
							onInput={(e) => handleSearch(e)}
						/>
					</div>
					<form action='' className='add_user_page'>
						<div className='form_group_right' onClick={() => setOpen(true)}>
							<img src={AddIcon} alt='adda_icon' />
							{t('worker.w19')}
						</div>
					</form>
				</div>
				<Table hover>
					<thead className='table_head'>
						<tr>
							<th>№</th>
							<th>{t('worker.w1')}</th>
							<th>{t('worker.w2')}</th>
							<th>{t('worker.w3')}</th>
							<th>{t('worker.w20')}</th>
							<th>{t('worker.w5')}</th>
							<th>{t('worker.w6')}</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody className='table_body'>
						{user.length
							? user
									?.sort((a, b) => a?.name?.localeCompare(b?.name))
									?.map((a, b) => (
										<tr className='body_tr' key={b}>
											<td>
												<span>{(page - 1) * 10 + (b + 1)}</span>
											</td>
											<td className='avatar_image'>
												<img
													src={'http://localhost:4000/' + a?.image}
													alt='avatar'
												/>
											</td>
											<td>
												<span>
													{a?.surname} {a?.name}
												</span>
											</td>
											<td>
												<span>{a?.telegramUsername}</span>
											</td>
											<td>
												<span>
													{a?.groupId?.profession +
														' ' +
														a?.groupId?.groupNumber}
												</span>
											</td>
											<td>
												<span>{a?.phoneNumber}</span>
											</td>
											<td>
												<span>{a?.jins}</span>
											</td>

											<td className='icon_link'>
												<span
													onClick={() => {
														GetIdUser(a?._id);
														setCode(true);
													}}
													className='lock_icon'
												>
													<img src={Lock} alt='Lock_ICON' />
												</span>
											</td>
											<td className='icon_link'>
												<span
													onClick={() => {
														setEdit(true);
														GetIdUser(a?._id);
													}}
												>
													<img src={Edit} alt='EDIT_ICON' />
												</span>
											</td>
											<td className='icon_link'>
												<span
													onClick={() => {
														setDalete(true);
														GetIdUser(a?._id);
													}}
												>
													<img src={Dalate} alt='dalete_icon' />
												</span>
											</td>
										</tr>
									))
							: 'Yordamchi oqtuvchilar yoq'}
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
				<SuperModal set={setOpen} height={'auto'} maxWidth={530} cancel={false}>
					<div className='add_user_modal'>
						<div className='title'>
							<h4>{t('worker.w7')}</h4>
						</div>
						<form className='form_add'>
							{getImage && (
								<div className='active_img'>
									<img src={'http://localhost:4000/' + getImage?.url} alt='' />
								</div>
							)}
							<div className='form_control'>
								<input type='text' placeholder='Name' required ref={nameRef} />
							</div>
							<div className='form_control'>
								<input
									type='text'
									placeholder='Surname'
									required
									ref={surnameRef}
								/>
							</div>
							<div className='form_control'>
								<input type='number' placeholder='Age' required ref={ageRef} />
							</div>
							<div className='form_control'>
								<input
									type='text'
									required
									id='section'
									placeholder={t('worker.w3')}
									ref={tgUserNameRef}
								/>
							</div>

							<div className='form_control'>
								<InputMask
									type='text'
									name='number'
									placeholder={t('worker.w5')}
									ref={phoneRef}
									required
									mask='\9\9\8\(99) 999-99-99'
									maskChar=' '
									autoComplete='off'
								/>
							</div>
							<div className='form_control'>
								<label htmlFor='file'>{t('worker.w18')}</label>
								<input
									type='file'
									name='file'
									required
									accept='image/*'
									ref={imageRef}
									id='file'
								/>
								<img src={UploadImage} alt='' />
							</div>
							<div className='form_control'>
								<select ref={groupSelect} placeholder='Student qoshish'>
									{allname.length
										? allname.map((el) => (
												<option style={{ color: 'black' }} value={el.value}>
													{el.label}
												</option>
										  ))
										: 'Student oqtuvchilar yoq '}
								</select>
							</div>
							<div className='form_control'>
								<select id='' placeholder='Gender' ref={jinsRef}>
									<option value='Male'>Male</option>
									<option value='Famale'>Famale</option>
								</select>
							</div>

							<div className='btn_form'>
								<div
									className='add'
									onClick={(e) => {
										onSubmit(e);
										setOpen(false);
									}}
								>
									{t('worker.w9')}
								</div>
								<a className='remove' onClick={() => setOpen(false)}>
									{t('worker.w10')}
								</a>
							</div>
						</form>
					</div>
				</SuperModal>
			)}
			{edit && (
				<SuperModal set={setEdit} height={'auto'} maxWidth={590} cancel={false}>
					<div className='add_user_modal'>
						<div className='title'>
							<h4>{t('worker.w11')}</h4>
						</div>
						<form className='form_add'>
							<div className='form_control'>
								<input
									type='text'
									placeholder='Name'
									required
									onChange={(e) => setChangefio(e?.target?.value)}
									defaultValue={changefio}
								/>
							</div>
							<div className='form_control'>
								<input
									type='text'
									placeholder='Surname'
									required
									onChange={(e) => setChangeSurname(e?.target?.value)}
									defaultValue={changeSurname}
								/>
							</div>
							<div className='form_control'>
								<input
									type='number'
									placeholder='age'
									required
									onChange={(e) => setChangeAge(e?.target?.value)}
									defaultValue={changeAge}
								/>
							</div>

							<div className='form_control'>
								<input
									type='text'
									required
									id='section'
									placeholder={t('worker.w3')}
									onChange={(e) => setChangedepartment(e?.target?.value)}
									defaultValue={changedepartment}
								/>
							</div>
							<div className='form_control'>
								<select
									ref={groupSelectEdit}
									defaultValue={changeposition}
									placeholder='Student qoshish'
								>
									{allname.length
										? allname.map((el) => (
												<option style={{ color: 'black' }} value={el.value}>
													{el.label}
												</option>
										  ))
										: 'Student oqtuvchilar yoq '}
								</select>
							</div>
							{/* <div className='form_control'>
								<input
									type='text'
									required
									id='text_work'
									placeholder={t('worker.w4')}
									onChange={(e) => setChangeposition(e?.target?.value)}
									defaultValue={changeposition}
								/>
							</div> */}
							<div className='form_control'>
								<InputMask
									type='text'
									name='number'
									placeholder={t('worker.w5')}
									required
									mask='\9\9\8\(99) 999-99-99'
									maskChar=' '
									autoComplete='off'
									onChange={(e) => setChangephone(e?.target?.value)}
									defaultValue={changephone}
								/>
							</div>
							<div className='form_control d-flex'>
								<label htmlFor='file'>{t('worker.w18')}</label>
								<input
									type='file'
									name='file'
									required
									accept='image/*'
									id='file'
									onChange={(e) => setChangeimg(e?.target?.files[0])}
								/>
								<img src={UploadImage} alt='' />
							</div>
							<div className='form_control'>
								<select
									id=''
									placeholder='Gender'
									defaultValue={changeGender}
									onChange={(e) => setChangeGender(e?.target?.value)}
								>
									<option value='Male'>Male</option>
									<option value='Famale'>Famale</option>
								</select>
							</div>
							{/* <div className='form_control_table'>
								<label>{t('worker.w12')}</label>
								<div className='d-flex'>
									<input
										type='text'
										placeholder='00'
										maxLength={2}
										min='24'
										
										defaultValue={time?.slice(0, 2)}
										className={num ? 'active' : null}
										required
									/>
									<span>:</span>
									<input
										type='text'
										placeholder='00'
										maxLength={2}
										min='60'
										// ref={}
										defaultValue={time1.length > 0 ? time1 : time?.slice(3, 5)}
										className={num2 ? 'active' : null}
										required
									/>
								</div>
							</div> */}
							<div className='btn_form'>
								<div
									className='add'
									onClick={(e) => {
										onSubmitUpdate(e);
										setEdit(false);
									}}
								>
									{t('worker.w13')}
								</div>
								<a className='remove' onClick={() => setEdit(false)}>
									{t('worker.w10')}
								</a>
							</div>
						</form>
					</div>
				</SuperModal>
			)}
			{dalete && (
				<SuperModal set={setDalete} height={350} maxWidth={530} cancel={false}>
					<div className='dalete_user'>
						<div className='title'>
							<h4>{t('worker.w14')}</h4>
						</div>
						<div className='dalete_about'>
							<img src={'http://localhost:4000/' + changeimg} alt='image' />
							<p>{changefio + ' ' + changeSurname}</p>
						</div>
						<div className='btn_form'>
							<a
								className='remove'
								onClick={() => {
									onSubmitDalete();
									setDalete(false);
								}}
							>
								{t('worker.w15')}
							</a>
							<div className='add' onClick={() => setDalete(false)}>
								{t('worker.w16')}
							</div>
						</div>
					</div>
				</SuperModal>
			)}
			{code && (
				<SuperModal set={setCode} height={350} maxWidth={530} cancel={true}>
					<div className='dalete_user'>
						<div className='title'>
							<h4>{t('worker.w17')}</h4>
						</div>
						<div className='dalete_about'>
							<img src={'http://localhost:4000/' + changeimg} alt='image' />
							<p>{changefio + ' ' + changeSurname}</p>
							<div className='psw'>
								<p>
									Username: <span>{unId}</span>
								</p>
								<p>
									Parol: <span> {psw} </span>{' '}
								</p>
							</div>
						</div>
					</div>
				</SuperModal>
			)}
		</div>
	);
};

export default Student;
