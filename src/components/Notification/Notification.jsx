import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NotIcon from '../../assets/image/new.svg';
import './Notification.scss';
import apiRoot from '../../store/apiRoot';
import { NEW } from '../../assets/const';
import SuperModal from '../SuperModal/SuperModal';
import SuccesModalImage from '../../assets/image/congrats-message.svg';
const Notification = ({ sms }) => {
	const token = localStorage.getItem('access_token');
	const [read, setRead] = useState();
	const [open, setOpen] = useState();
	const [open2, setOpen2] = useState(false);
	const [messageId, setMessageId] = useState();
	const [seccesModal, setSuccesModal] = useState(false);
	const [id, setId] = useState();
	const [send, setSend] = useState();

  const { t } = useTranslation();
	const onRead = () => {
		apiRoot
			.get(`/v1/messages/list`, {
				headers: {
					Authorization: `${token}`,
				},
			})
			.then((res) => {
				setRead(res?.data);
			});
	};
	const GetMessageId = (id) => {
		apiRoot
			.get(`/v1/message/${id}`, {
				headers: {
					Authorization: `${token}`,
				},
			})
			.then((res) => {
				setMessageId(res?.data);
			});
	};

	const SendAccept = (e, param) => {
		e.preventDefault();
		const data = {
			message_id: messageId?.id,
			status: param,
		};
		apiRoot
			.put(`/v1/message`, data, {
				headers: {
					Authorization: `${token}`,
				},
			})
			.then((res) => {
				setSend(res?.data);
				setOpen2(false);
				setSuccesModal(true);
				setTimeout(() => {
					setSuccesModal(false);
				}, 2000);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		onRead();
	}, [seccesModal === false, sms]);
	return (
		<>
			<div className='noty' onClick={() => setOpen((prev) => !prev)}>
				<a>
					<NEW
						fill={
							read?.send?.length > 0
								? 'red'
								: read?.send?.length > 3
								? 'black'
								: read?.send?.length > 6
								? 'white'
								: '#C5C7CD'
						}
					/>
					<span>|</span>
				</a>
				{open && (
					<div className='noty_menu'>
						<div className='title'>
							<h4>{t('notification.n1')}</h4>
						</div>
						{read?.send === null ? (
							<p>{t('notification.n2')}</p>
						) : (
							read?.send?.map((item, index) => (
								<div
									className='noty_noread_menu'
									key={index}
									onClick={() => {
										setOpen2(true);
										GetMessageId(item?.id);
									}}
								>
									<div className='noread_image'>
										<img src={'http://' + item?.wimg} alt='' />
									</div>
									<div className='noread_text'>
										<p>{item?.wname}</p>
									</div>
								</div>
							))
						)}
					</div>
				)}
			</div>
			{open2 && (
				<SuperModal set={setOpen2} height={'auto'} maxWidth={730} cancel={true}>
					<div className='sms_modal'>
						<div className='sms_text'>
							<h4>{t('notification.n3')}</h4>
						</div>
						<div className='sms_modal_header '>
							<div className='sms_title'>
								<img src={'http://' + messageId?.wimg} />
							</div>
							<div className='sms_title'>
								<h6>{messageId?.wname}</h6>
								{/* <p>{sms?.data?.position} {sms?.data?.department}</p> */}
								<p>+{messageId?.wcontact}</p>
							</div>
						</div>
						<div className='sms_modal_body'>
							<div className='text'>
								{messageId?.message}
								<p className='mt-5'>
									{messageId?.from_day?.slice(0, 10)} -{' '}
									{messageId?.to_day?.slice(0, 10)}
								</p>
							</div>
						</div>
						<div className='sms_modal_btn'>
							<div className='add' onClick={(e) => SendAccept(e, true)}>
              {t('notification.n4')}
							</div>
							<a className='remove' onClick={(e) => SendAccept(e, false)}>
              {t('notification.n5')}
							</a>
						</div>
					</div>
				</SuperModal>
			)}
			{seccesModal && (
				<SuperModal
					set={setSuccesModal}
					height={290}
					maxWidth={700}
					cancel={false}
				>
					<div className='succes_modal'>
						<img src={SuccesModalImage} alt='icon' />
						<p>{t('notification.n6')}</p>
					</div>
				</SuperModal>
			)}
		</>
	);
};

export default Notification;
