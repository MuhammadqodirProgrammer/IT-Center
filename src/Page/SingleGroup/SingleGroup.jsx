import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import apiRoot from '../../store/apiRoot';
import Edit from '../../assets/image/Group 9.svg';
import Dalate from '../../assets/image/Group 10.svg';
import UploadImage from '../../assets/image/upload.svg';
import Lock from '../../assets/image/lock (1).png';
import "./singleGroup.scss"
import { useTranslation } from 'react-i18next';
export const SingleGroup = () => {
    const {t} =useTranslation()
    const {id }=useParams()
    const token = localStorage.getItem('token');
	const [group, setGroup] = useState();
	const [student, setStudent] = useState([]);
	const [getGroup, setGetGroup] = useState([]);
	const getStudents = () => {
		apiRoot
			.get(`/student`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data?.data);
                const allSrudents = res.data?.data
				if (allSrudents) {
          const myStudents =allSrudents.filter(el =>el.groupId?._id == id)
          console.log(myStudents);
					setStudent(myStudents);
				}
			});
	};
    const getGroups = () => {
		apiRoot
			.get(`/tGroup/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data?.data);
				if (res.data?.data) {
					setGetGroup(res.data?.data);
				}
			});
	};
	useEffect(() => {
		getGroups();
        getStudents()
		console.log(getGroup[0] ,"single");
	}, []);
    console.log(id);
  return (
    <div>
    <div className='teacher_section'>
			<Container fluid>
				<div className='group_header'>
				
				
					<h3>{getGroup[0]?.profession +"  N"+ getGroup[0]?.groupNumber} Royhati</h3>
				</div>
<div className="single_box">
				{getGroup.length ? (
					<div className='cards_box'>
						{
							getGroup.map(g =>	<div  className='group_card'>
						<div className='yonalish'>
							<h5>{g.profession}</h5>
						</div>
						<div className='group_body'>
							<div className='group_body_top'>
								<img src={`http://localhost:4000/` + g.image} alt='img' className='top_img' />
								<div className='top_text'>
									<div className='flexer'>
										<p>Ustoz:</p> <span>{g.teacher}</span>
									</div>
									<div className='flexer'>
										<p>Guruh Raqami:</p> <span>{g.groupNumber}</span>
									</div>
								</div>
							</div>
							<div className='group_body_bottom'>
								<div className='botom_content'>
									<p>Dars kunlari:</p>
									<span>{g.days}</span>
								</div>
								<div className='botom_content'>
									<p>Dars vaqti:</p>
									<span> {g.hours}</span>
								</div>
								<div className='botom_content'>
									<p>O'quvchilar soni:</p>
									<span>{g.teacher}</span>
								</div>
							</div>
						</div>
					</div>)
						}
					</div>
				) : (
					'Guruhlar yoq yoki internet bn qandaydir  muomo bor'
				)}

                <Table hover>
					<thead className='table_head'>
						<tr>
							<th>№</th>
							<th>{t('worker.w1')}</th>
							<th>{t('worker.w2')}</th>
							<th>age</th>
							<th>{t('worker.w5')}</th>
							{/* <th></th> */}
						</tr>
					</thead>
					<tbody className='table_body'>
						{student.length
							? student
									?.sort((a, b) => a?.name?.localeCompare(b?.name))
									?.map((a, b) => (
										<tr className='body_tr' key={b}>
											<td>
												<span>{(b + 1)}</span>
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
												<span>{a?.age}</span>
											</td>
										
											<td>
												<span>{a?.phoneNumber}</span>
											</td>

									
											{/* <td className='icon_link'>
												<span
													onClick={() => {
														// setEdit(true);
														// GetIdUser(a?._id);
														
													}}
												>
													<img src={Edit} alt='EDIT_ICON' />
												</span>
											</td> */}
										
										</tr>
									))
							: 'Yordamchi oqtuvchilar yoq'}
					</tbody>
				</Table>
</div>
			</Container>
		</div>
    </div>
  )
}
