import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"

const SuccesLogin = () => {
  const navigate = useNavigate();

  const [acces, setAcces] = useState(false)
  // const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if(!localStorage.getItem('userToken')){
      navigate('/');
      setAcces(false)
    }
    else{
      setAcces(true)
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  // const url = 'https://www.melivecode.com/api/auth/user';
  // const token = localStorage.getItem('userToken')
  // const options = {
  //   method: "GET",
  //   headers : {
  //     "Content-type" : "Application/json; charset=UTF-8",
  //     "Authorization" : `Bearer: ${token}`
  //   }
  // }

  // const getUserData = () => {
  //   console.log(token)
  //     fetch(url, options)
  //       .then(response => response.json())
  //       .then(data => console.log(data))
  // }

  const userData = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div>
      {acces ? 
        <div className='succes-wrapper'>
          <h1 className='succes-heading'> Wellcome back {userData.firstName || 'User'} </h1>
          <h2 className='succes-subheading'>Personal info:</h2>
          <div className='user-info-container'>
            <div className='info-row'>
              <sapn>First Name:</sapn>
              <sapn className="span-data-value">{userData.firstName}</sapn>
            </div>
            <div className='info-row'>
              <sapn>Last Name:</sapn>
              <sapn className="span-data-value">{userData.lastName}</sapn>
            </div>
            <div className='info-row'>
              <sapn>Username:</sapn>
              <sapn className="span-data-value">{userData.username}</sapn>
            </div>
            <div className='info-row'>
              <sapn>Email:</sapn>
              <sapn className="span-data-value">{userData.email}</sapn>
            </div>
          </div>
          <button className='logout-btn' onClick={logout}>Logout</button>
        </div>
       : null
       }
      
    </div>
  )
}

export default SuccesLogin