import React, { useEffect, useRef, useState } from 'react';
import SuperModal from '../../components/SuperModal/SuperModal';
import UploadImage from '../../assets/image/upload.svg';
import apiRoot from '../../store/apiRoot';
import Edit from '../../assets/image/Group 9.svg';

// import "../Event/Event.scss"
import './StudentHomework.scss';
import AddIcon from '../../assets/image/material-symbols_add.svg';

import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
export const StudentHomework = () => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();
	const title = useRef();
	const groupId = useRef();
	const secondaryTeacherId = useRef();
	const image = useRef();
	const lesson = useRef();
    const title2 = useRef();
	
	const image2 = useRef();
	const lesson2 = useRef();
	const [allname, setAllname] = useState('');
	const [homework, setHomework] = useState([]);
	const [allnameGroup, setAllnameGroup] = useState('');
	const token = localStorage.getItem('token');
    const [homeworkImg, setHomeworkImg] = useState();
    const [code, setCode] = useState();
    const [TeacherId, setTeacherId] = useState();
    const [grId, setGroupId] = useState();
    const [homId, setHomId] = useState();

	const [titlest, setTitle] = useState();

	const [lessonst, setLesson] = useState();
	const getHomework = () => {
		apiRoot
			.get(`/homework`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				// setAllname(SelectDate(res?.data?.data));
				// console.log(res.data, 'home');
				setHomework(res.data?.data);
			})
			.catch(() => {
				// error()
			});
	};
	useEffect(() => {
		// getGroups();
		getHomework();
		apiRoot
			.get(`/teacherAll`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setAllname(SelectDate(res?.data?.data));
				// console.log(res.data.data, 'data');
			})
			.catch(() => {
				// error()
			});

		apiRoot
			.get(`/groupAll`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setAllnameGroup(SelectDate2(res?.data?.data));
				// console.log(res.data.data, 'data');
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
	const SelectDate2 = (arr) => {
		const option = [];
		arr?.map((item) => {
			option?.push({
				value: item?._id,
				label: item?.profession + ' N' + item?.groupNumber,
			});
		});
		return option;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const d = new FormData();

		d.append('title', title.current?.value);
		d.append('lesson', lesson.current?.value);
		d.append('image', image.current?.files[0]);
	

		console.log(
			title.current?.value,
			lesson.current?.value,
			image.current?.files[0],
			
		);
		apiRoot
			.post(`/homework`, d, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
                console.log(res ,"new ");
				if (res.data) {
					getHomework();
				}
				// console.log(res.data, 'data');
			})
			.catch(() => {
				// error()
			});
	};
    const handleSubmit2 = (e) => {
		e.preventDefault();

		const d = new FormData();

		d.append('title', title2.current?.value || titlest);
		d.append('lesson', lesson2.current?.value || lessonst);
		d.append('image', image2.current?.files[0] ||homeworkImg);
		// d.append('groupId',grId );
		// d.append('secondaryTeacherId', TeacherId);
		
    
		apiRoot
			.put(`/editHomework/${homId}`, d, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data) {
					getHomework();
				}
				console.log(res.data, 'update');
			})
			.catch(() => {
				// error()
			});
	};

    const getHomeworkOne = (id) => {
		// console.log(id ,"homid");
        setHomId(id)
		apiRoot
			.get(`/homework/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data?.data, 'dataone');
				const homeworkOne = res.data?.data;
				if (homeworkOne) {
					setHomeworkImg(homeworkOne[0]?.image);
					setTitle(homeworkOne[0]?.title);
					setLesson(homeworkOne[0]?.lesson);
                    setTeacherId(homeworkOne[0]?.secondaryTeacherId?._id)
				   setGroupId(homeworkOne[0]?.groupId ?._id)
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<div className='add_user_page'>
				<div className='form_group_right' onClick={() => setOpen(true)}>
					<img src={AddIcon} alt='adda_icon' />
					Add Homework
				</div>
			</div>

			<div className='table_box'>
				<Table hover>
					<thead className='table_head'>
						<tr>
							<th>№</th>
							<th>{t('worker.w1')}</th>
							<th>Lesson</th>
							<th>Yuborilgan vaqt</th>
							<th>Title</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody className='table_body'>
						{homework?.sort((a, b) => a?.lesson - b?.lesson)?.map((a, b) => (
							<tr className='body_tr' key={b}>
								<td>
									<span>{b + 1}</span>
								</td>
								<td className='avatar_image'>
									<img src={'http://localhost:4000/' + a?.image} alt='avatar' />
								</td>
								<td>
									<span>{a?.lesson}</span>
								</td>
								<td>
									<span>{a?.createdAt}</span>
								</td>

								<td>
									<span>{a?.title}</span>
								</td>
								<td className='icon_link'>
									<span
										onClick={() => {
											// setCheck(true);
											getHomeworkOne(a?._id);
											setCode(true);
										}}
									>
										<img src={Edit} alt='EDIT_ICON' />
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			{open && (
				<SuperModal set={setOpen} height={'auto'} maxWidth={800} cancel={false}>
					<div className='add_user_modal'>
						<div className='title'>
							<h4>Add homework</h4>
						</div>
						<form className='form_add'>
							<div className='form_control'>
								<input
									type='text'
									name='text'
									id='input'
									placeholder='title'
									required
									autoComplete='off'
									ref={title}
								/>
							</div>
							<div className='form_control'>
								<input
									type='number'
									name='text'
									id='input'
									placeholder='lesson number'
									required
									autoComplete='off'
									ref={lesson}
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
									ref={image}
								/>
								<img src={UploadImage} alt='' />
							</div>

							{/* <div className='form_control'>
								<select ref={groupId} placeholder='Yordamchi ustoz qoshish'>
									{allnameGroup.length
										? allnameGroup.map((el) => (
												<option style={{ color: 'black' }} value={el.value}>
													{el.label}
												</option>
										  ))
										: 'Yordamchi oqtuvchilar yoq '}
								</select>
							</div>
							<div className='form_control'>
								<select ref={secondaryTeacherId} placeholder='Guruh tanlash'>
									{allname.length
										? allname.map((el) => (
												<option style={{ color: 'black' }} value={el.value}>
													{el.label}
												</option>
										  ))
										: 'Guruhlar yoq'}
								</select>
							</div> */}
							<div className='btn_form'>
								<div
									className='add'
									onClick={(e) => {
										handleSubmit(e);
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
            {code && (
				<SuperModal set={setCode} height={'auto'} maxWidth={800} cancel={false}>
					<div className='add_user_modal'>
						<div className='title'>
							<h4>Edit homework</h4>
						</div>
						<form className='form_add'>
							<div className='form_control'>
								<input
                                defaultValue={titlest}
									type='text'
									name='text'
									id='input'
									placeholder='title'
									required
									autoComplete='off'
									ref={title2}
								/>
							</div>
							<div className='form_control'>
								<input
                                defaultValue={lessonst}
									type='number'
									name='text'
									id='input'
									placeholder='lesson number'
									required
									autoComplete='off'
									ref={lesson2}
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
									ref={image2}
								/>
								<img src={UploadImage} alt='' />
							</div>

							<div className='btn_form'>
								<div
									className='add'
									onClick={(e) => {
										handleSubmit2(e);
										setCode(false);
									}}
								>
									Qo‘shish
								</div>
								<a className='remove' onClick={() => setCode(false)}>
									Bekor qilish
								</a>
							</div>
						</form>
					</div>
				</SuperModal>
			)}
		</div>
	);
};
