import { useEffect, useState } from 'react';
import Router from './RouterPage/Router';
import './App.scss';
import './messaging_init_in_sw';
import { getToken } from 'firebase/messaging';
import { getTokenFunc, onMessageListener } from './firebase';
import toast, { Toaster } from 'react-hot-toast';
import SuperModal from './components/SuperModal/SuperModal';
import Toast from 'react-bootstrap/Toast';
import apiRoot from './store/apiRoot';
import SucessModalImage from './assets/image/congrats-message.svg';
import mp3 from '../src/assets/mp3/audio.mp3';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import { lang } from './lang/lang';
import { Admin } from './apps/Admin';
import { Teacher } from './apps/Teacher';
import { Student } from './apps/Student';
function App() {
	// lang  start
	i18n.use(initReactI18next).init({
		// lng: 'uz',
		fallbackLng: localStorage.getItem('lang') || 'uz',

		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: { translation: lang.en },
			uz: { translation: lang.uz },
			ru: { translation: lang.ru },
		},
	});
	// lang finished

	const [theme, setTheme] = useState('dark');

	const changeTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};
	localStorage.setItem('theme', theme);
	const token = localStorage.getItem('access_token');

	const [show, setShow] = useState(false);
	const [notification, setNotification] = useState({ title: '', body: '' });
	const [isTokenFound, setTokenFound] = useState(false);
	const [sms, setSms] = useState('');
	const [open, setOpen] = useState(false);
	const [showA, setShowA] = useState(true);
	const [send, setSend] = useState();
	const [messageId, setMessageId] = useState();
	const [seccesModal, setSuccesModal] = useState(false);
	const audio = new Audio(mp3);
	const toggleShowA = () => setShowA((prev) => !prev);

	getTokenFunc(setTokenFound);

	onMessageListener()
		.then((payload) => {
			setShow(true);
			setNotification({
				title: payload.notification.title,
				body: payload.notification.body,
			});
			console.log(payload, 'sms');
			setSms(payload);
			// audio.play()
		})
		.catch((err) => console.log('failed: ', err));
	const SendAccept = (e, param) => {
		e.preventDefault();
		const data = {
			message_id: sms?.data?.message_id,
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
				console.log(res?.data, 'smslar');
				setOpen(false);
				toggleShowA();
				setSuccesModal(true);
				setTimeout(() => {
					setSuccesModal(false);
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
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
	// useEffect(()=>{
	//   GetMessageId()
	// },[])
	// setTimeout(() => {
	//     toggleShowA()
	// }, 10000);
	const role = 'admin';

	if (role == 'admin') {
		return (
			<div className='App' id={theme}>
				{/* <Router mode={changeTheme} sms={sms} /> */}
				<Admin mode={changeTheme} sms={sms} />
				{sms && (
					<Toast
						delay={2000}
						className='toast'
						onClick={() => {
							setOpen(true);
							GetMessageId(sms?.data?.message_id);
							setShow(false);
						}}
					>
						<Toast.Header className='sms_noty'>
							<div className='header_noty me-auto'>
								<img src={sms?.notification?.image} alt='image' />
								<div className='noty_title_flex'>
									<h6>{sms?.notification?.title}</h6>
									<p>New message</p>
								</div>
							</div>
						</Toast.Header>
					</Toast>
				)}
				{open && (
					<SuperModal
						set={setOpen}
						height={'auto'}
						maxWidth={730}
						cancel={true}
					>
						<div className='sms_modal'>
							<div className='sms_text'>
								<h4>Xodim tomonidan yuborilgan xabar</h4>
							</div>
							<div className='sms_modal_header '>
								<div className='sms_title'>
									<img src={'http://' + messageId?.wimg} />
								</div>
								<div className='sms_title'>
									<h6>{messageId?.wname}</h6>
									<p>
										{sms?.data?.position} {sms?.data?.department}
									</p>
									<p>{messageId?.wcontact}</p>
								</div>
							</div>
							<div className='sms_modal_body'>
								<div className='text'>
									<p>
										{messageId?.from_day.slice(0, 10)} -{' '}
										{messageId?.to_day?.slice(0, 10)}
									</p>
									{messageId?.message}
								</div>
							</div>
							<div className='sms_modal_btn'>
								<div className='add' onClick={(e) => SendAccept(e, true)}>
									Tasdiqlash
								</div>
								<a className='remove' onClick={(e) => SendAccept(e, false)}>
									Bekor qilish
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
							<img src={SucessModalImage} alt='icon' />
							<p> Murojaat tasdiqlandi!</p>
						</div>
					</SuperModal>
				)}
			</div>
		);
	} else if (role == 'teacher') {
		return (
			<div className='App' id={theme}>
				<Teacher mode={changeTheme} sms={sms} />
			</div>
		);
	} else if (role == 'student') {
		return (
			<div className='App' id={theme}>
				<Student/>
			</div>
		);
	} else {
	}
}

export default App;
