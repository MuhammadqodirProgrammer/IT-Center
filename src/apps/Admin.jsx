import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import PageNotFound from '../Page/404page/PageNotFound'
import Group from '../Page/Event/Event'
import Login from '../Page/Login/Login'
import Message from '../Page/Message/Message'
import Sections from '../Page/Sections/Sections'
import Statistic from '../Page/Statistic/Statistic'
import Worker from '../Page/Worker/Worker'
export const Admin = ({mode ,sms}) => {
    const token = localStorage.getItem("access_token")
    const error = sessionStorage.getItem("err")
    if(error){
      return <Routes>
          <Route path='/' element={<PageNotFound/>}/>
      </Routes>
    }
    if(token === null){
      return   <Routes>
                  <Route path='/' element={<Login mode={mode}/>} />
                  <Route path='*' element={<Navigate to={"/"}/>}/>
              </Routes>
    }
    else{
      return (
        <>
        <Layout mode={mode} sms={sms}>
            <Routes>
                  <Route path='/' element={<Statistic/>} /> 
                  {/* <Route path='history' element={<History/>} /> */}
                  <Route path='worker' element={<Worker/>} />
                  {/* <Route path='table' element={<TablePage/>}/> */}
                  <Route path='sections' element={<Sections/>}/>

                  <Route path='group' element={<Group/>}/>
                  <Route path='message/:id' element={<Message/>}/>
              <Route path='*' element={<Navigate to={"/"}/>}/>
            </Routes>
          </Layout>
        </>
      )
    }
}
