import React from 'react';
import Layout from '../components/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import History from '../Page/History/History';
import Worker from '../Page/Worker/Worker';
import Statistic from '../Page/Statistic/Statistic';
import Login from '../Page/Login/Login';
import TablePage from '../Page/TablePage/TablePage';
import Sections from '../Page/Sections/Sections';
import Message from '../Page/Message/Message';
// import Event from '../Page/Event/Group'
import PageNotFound from '../Page/404page/PageNotFound';
import Group from '../Page/Event/Event';

const Router = ({ mode, sms }) => {
	const token = localStorage.getItem('token');
	const error = sessionStorage.getItem('err');
	if (error) {
		return (
			<Routes>
				<Route path='/' element={<PageNotFound />} />
			</Routes>
		);
	}
	if (token === null) {
		return (
			<Routes>
				<Route path='/' element={<Login mode={mode} />} />
				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		);
	} else {
		return (
			<>
				<Layout mode={mode} sms={sms}>
					<Routes>
						<Route path='/' element={<Statistic />} />
						{/* <Route path='history' element={<History/>} /> */}
						<Route path='worker' element={<Worker />} />
						{/* <Route path='table' element={<TablePage/>}/> */}
						<Route path='sections' element={<Sections />} />
						<Route path='group' element={<Group />} />
						<Route path='message/:id' element={<Message />} />
						<Route path='*' element={<Navigate to={'/'} />} />
					</Routes>
				</Layout>
			</>
		);
	}
};

export default Router;
