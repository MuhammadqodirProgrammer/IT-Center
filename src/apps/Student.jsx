import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import LayoutStudent from '../components/LayoutStudent/LayoutStudent'
import { Homework } from '../Page/Homework/Homework'
import { StudentHomework } from '../Page/StudentHomework/StudentHomework'

export const Student = () => {
  return (
    <>
      <LayoutStudent>

       {/* <Header/> */}
       <Routes>
			
						<Route path='homework' element={<StudentHomework />} />

						<Route path='*' element={<Navigate to={'/'} />} />
					</Routes>
       <div>Student</div>
      </LayoutStudent>
    </>
  )
}
