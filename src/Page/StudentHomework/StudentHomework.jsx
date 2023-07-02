import React, { useEffect, useRef, useState } from 'react';
import SuperModal from '../../components/SuperModal/SuperModal';
import UploadImage from '../../assets/image/upload.svg';
import apiRoot from '../../store/apiRoot';
// import "../Event/Event.scss"
import './StudentHomework.scss';
import AddIcon from '../../assets/image/material-symbols_add.svg';

import { useTranslation } from 'react-i18next';
export const StudentHomework = () => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();
	const title = useRef();
	const groupId = useRef();
	const secondaryTeacherId = useRef();
	const image = useRef();
	const lesson = useRef();
	const [allname, setAllname] = useState('');
	const [allnameGroup, setAllnameGroup] = useState('');
	const token = localStorage.getItem('token');

	useEffect(() => {
		// getGroups();
		apiRoot
			.get(`/teacherAll`, {
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
		d.append('groupId', groupId.current?.value);
		d.append('secondaryTeacherId', secondaryTeacherId.current?.value);

		console.log(
			title.current?.value,
			lesson.current?.value,
			image.current?.files[0],
			groupId.current?.value,
			secondaryTeacherId.current?.value
		);
        apiRoot
			.post(`/homework`,  d,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				// setAllnameGroup(SelectDate2(res?.data?.data));
				console.log(res.data, 'data');
			})
			.catch(() => {
				// error()
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

							<div className='form_control'>
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
							</div>
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
		</div>
	);
};
