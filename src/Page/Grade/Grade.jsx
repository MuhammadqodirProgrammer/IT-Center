import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { GroupCard } from '../../components/GroupCard/GroupCard';
import apiRoot from '../../store/apiRoot';
import img from '../../assets/image/engFlag.png';
import { Link } from 'react-router-dom';
import '../GroupTeacher/grouppage.scss';
import MyPagination from '../../components/MyPagination/MyPagination';

export const Grade = () => {
	const token = localStorage.getItem('token');
	const [group, setGroup] = useState();
	const [getGroup, setGetGroup] = useState([]);
	const [page, setPage] = useState(1);
	const [allPage, setAllPage] = useState();
	const getGroups = () => {
		apiRoot
			.get(`/tGroup/skip=${page}/limit=${10}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data ,"page:" ,page );
				if (res.data?.data) {
					setAllPage(res.data?.total_page)
					setGetGroup(res.data?.data);
				}
			});
	};
	useEffect(() => {
		getGroups();
		console.log(getGroup);
	}, []);
	const HandleChangePage = useCallback((page) => {
		setPage(page);
	}, []);
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
	useEffect(() => {
		getGroups()
	}, [page]);
	return (
		<div className='teacher_section'>
			<Container fluid>
				<div className='group_header'>
					<div className='form_control_search'>
						<input
							type='search'
							placeholder='Search by group number...'
							required
							onChange={(e) => handleSearch(e)}
							// onInput={(e)=>handleSearch(e)}
						/>
					</div>
					{/* <select id=''>
						<option value='sort by number'>sort by number</option>
						<option value='yonalish'>yonalish</option>
					</select> */}
					<h3>Guruhlar</h3>
				</div>

				{getGroup.length ? (
					<div className='cards_box'>
						{getGroup.map((g) => (
							<Link to={'/grade/' + g._id} className='group_card'>
								<div className='yonalish'>
									<h5>{g.profession}</h5>
								</div>
								<div className='group_body'>
									<div className='group_body_top'>
										<img
											src={`http://localhost:4000/` + g.image}
											alt='img'
											className='top_img'
										/>
										<div className='top_text'>
											<div className='flexer'>
												<p>Guruh Raqami:</p> <span>{g.groupNumber}</span>
											</div>
										</div>
									</div>
									<div className='group_body_bottom'>
										<div className='flexer'>
											<p>Ustoz:</p> <span>{g.teacher}</span>
										</div>
										<div className='botom_content'>
											<p>Dars kunlari:</p>
											<span>{g.days}</span>
										</div>
										<div className='botom_content'>
											<p>Dars vaqti:</p>
											<span> {g.hours}</span>
										</div>
										<div className='botom_content'>
											<p>Hona nomi:</p>
											<span>{g.roomName}</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					'Guruhlar yoq yoki internet bn qandaydir  muomo bor'
				)}
				{allPage >1 && (
					<MyPagination

						total={allPage }
						current={page}
						onChangePage={HandleChangePage}
					/>
				)}
			</Container>
		</div>
	);
};
