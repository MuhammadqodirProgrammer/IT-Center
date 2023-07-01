import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutTeacher from '../components/LayoutTeacher/LayoutTeacher';
import PageNotFound from '../Page/404page/PageNotFound';
import Group from '../Page/Event/Event';
import { Grade } from '../Page/Grade/Grade';
import { GroupTeacher } from '../Page/GroupTeacher/GroupTeacher';
import { Homework } from '../Page/Homework/Homework';
import { HomeworkSingle } from '../Page/HomeworkSingle/HomeworkSingle';
import Login from '../Page/Login/Login';
import Message from '../Page/Message/Message';
import { SingleGrade } from '../Page/SingleGrade/SingleGrade';
import { SingleGroup } from '../Page/SingleGroup/SingleGroup';
import Statistic from '../Page/Statistic/Statistic';
import StatisticTeacher from '../Page/StatisticTeacher/Statistic';
import Student from '../Page/Student/Student';

export const Teacher = ({ mode, sms }) => {
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
				<LayoutTeacher mode={mode} sms={sms}>
					<Routes>
						<Route path='/' element={<StatisticTeacher />} />
						<Route path='group' element={<GroupTeacher />} />
						<Route path='group/:id' element={<SingleGroup />} />
						<Route path='grade/:id' element={<SingleGrade />} />
						<Route path='grade' element={<Grade />} />
						<Route path='homework' element={<Homework />} />
						<Route path='homework/:id' element={<HomeworkSingle />} />
						<Route path='*' element={<Navigate to={'/'} />} />
					</Routes>
				</LayoutTeacher>
			</>
		);
	}
};
