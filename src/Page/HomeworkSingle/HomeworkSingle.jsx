import { useEffect, useRef, useState } from 'react';
import { Col, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import apiRoot from '../../store/apiRoot';
import '../GroupTeacher/grouppage.scss';
import Edit from '../../assets/image/Group 9.svg';
import '../SingleGroup/singleGroup.scss';
import "../Homework/homework.scss"
import SuperModal from '../../components/SuperModal/SuperModal';
import { useParams } from 'react-router-dom';

export const HomeworkSingle = () => {
	const token = localStorage.getItem('token');
	const { id } = useParams();
	const { t } = useTranslation();
	const [code, setCode] = useState(false);
const bahoRef = useRef();
const descRef = useRef();
	const [worker, setWorker] = useState();
	const [homeworkImg, setHomeworkImg] = useState();
	const [title, setTitle] = useState();
	const [lesson, setLesson] = useState();
	const [send, setSend] = useState();
	const [name, setName] = useState();
	const [homId, sethomId] = useState();
	const [workerIn, setWorkerIn] = useState();
	const [workerAll, setWorkerAll] = useState();
	const [workerTop, setWorkerTop] = useState();
	const [homeworkId, setHomeworkId] = useState();
	const [check, setCheck] = useState(false);
	const [homework, setHomework] = useState([]);

	const getHomeworks = () => {
		apiRoot
			.get(`/check/homework`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data?.data);
				const allHemework = res.data?.data;
				if (allHemework) {
					setHomework(allHemework);
				}
			});
	};
	const render = (num) => {
		const arr = [];
		const myHomework = homework.filter((el) => {
			if (el.groupId?._id == id && el.lesson == num) {
				arr.push(el);
			} else {
				return arr;
			}
		});
		return arr;
	};
	useEffect(() => {
		getHomeworks();
		console.log(render(8), 'render');
		console.log(homework);
	}, []);
const handleSubmit =(e)=>{
e.preventDefault()
const data ={
    title:title,
    lesson:lesson,
    homeworkId:homId,
    rank:bahoRef.current?.value,
    description:descRef.current?.value,
}
console.log(data);
apiRoot.post("/grade" ,data ,{
    headers: {
        Authorization: `Bearer ${token}`,
    }
}).then(res => {
    console.log(res);
   if(res.data){
    console.log(res.data);
   }
})

}
	const getHomeworkOne = (id) => {
		console.log(id);
		apiRoot
			.get(`/check/homework/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data?.data, 'data');
				const homeworkOne = res.data?.data;
				if (homeworkOne) {
					setHomeworkImg(homeworkOne[0]?.image);
					setTitle(homeworkOne[0]?.title);
					setLesson(homeworkOne[0]?.lesson);
					setSend(homeworkOne[0]?.createdAt);
					setName(
						homeworkOne[0]?.studentId?.name +
							' ' +
							homeworkOne[0]?.studentId?.surname
					);
					// setHomework(res.data?.data);
				}
			});
	};
	const tabs = [];
	for (let i = 1; i < 13; i++) {
		tabs.push(i);
	}
	useEffect(() => {
		// getHomeworkOne()
		console.log(homeworkImg, 'homeworkImg');
	}, [check]);
	return (
		<div className='teacher_section'>
			<div className='tab_block'>
				<Tabs
					defaultActiveKey='lesson1'
					id='justify-tab-example'
					className='mb-3 mt-4 gap-2'
					justify
				>
					{tabs.length
						? tabs.map((el) => (
								<Tab
									eventKey={`lesson${el}`}
									title={<div className='title'>{`Lesson${el}`}</div>}
								>
									<div className='tab_content'>
										<ul className='all_user'>
											<div className='title'>
												<h6>Yuborilgan Uy ishlari</h6>
											</div>

											<Table hover>
												<thead className='table_head'>
													<tr>
														<th>№</th>
														<th>{t('worker.w1')}</th>
														<th>{t('worker.w2')}</th>
														<th>Yuborilgan vaqt</th>
														<th>Title</th>
														<th></th>
													</tr>
												</thead>
												<tbody className='table_body'>
													{homework.length
														? render(el)
																?.sort((a, b) =>
																	a?.name?.localeCompare(b?.name)
																)
																?.map((a, b) => (
																	<tr className='body_tr' key={b}>
																		<td>
																			<span>{b + 1}</span>
																		</td>
																		<td className='avatar_image'>
																			<img
																				src={
																					'http://localhost:4000/' + a?.image
																				}
																				alt='avatar'
																			/>
																		</td>
																		<td>
																			<span>
																				{a?.studentId?.surname}{' '}
																				{a?.studentId?.name}
																			</span>
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
																					setCheck(true);
																					getHomeworkOne(a?._id);
																					setCode(true);
                                                                                    sethomId(a?._id)
																				}}
																			>
																				<img src={Edit} alt='EDIT_ICON' />
																			</span>
																		</td>
																	</tr>
																))
														: 'Yordamchi oqtuvchilar yoq'}
												</tbody>
											</Table>
										</ul>
									</div>
								</Tab>
						  ))
						: 'lessonlar yoq'}
				</Tabs>

				{code && (
					<SuperModal set={setCode} height="88vh" maxWidth={830} width={700}cancel={true}>
						<div className='dalete_user'>
							<div className='title'>
								<h4> {name}ning Yuborilgan vazifasi</h4>
							</div>
							<div className='dalete_about'>
								<img src={'http://localhost:4000/' + homeworkImg} alt='image' />
								{/* <p>{'title:' + ' ' + title}</p>
								<p>{'lesson:' + ' ' + lesson}</p>
								<div className='psw'>
								
									<p>
										Yuborilgan: <span> {send} </span>{' '}
									</p>
								</div> */}
                                <form style={{marginTop:"20px"}} onSubmit={(e)=>handleSubmit(e)} >
                                <div className='form_control'>
								<input
									type='number'
									id='input'
									placeholder="Baho"
									required
									autoComplete='off'
									ref={bahoRef}
								/>
							</div>
                            <div className='form_control'>
                            <textarea  placeholder='Description' cols="3" rows="10"
									ref={descRef}
                            
                            ></textarea>
								
							</div>

                                <button className='mybtn'>Send</button>
                                </form>
							</div>
						</div>
					</SuperModal>
				)}
			</div>
		</div>
	);
};
