import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const LoginCard = () => {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [submited, setSubmited] = useState(false);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);

  const url = 'https://www.melivecode.com/api/login';
  const userData = {
    "username" : values.username,
    "password" : values.password,
    "expiresIn": 60000
  }
  const options = {
    method: "POST",
    body: JSON.stringify(userData),
    headers : {"Content-type" : "Application/json; charset=UTF-8"}
  }

  const fetchData = () => {
    return(
      fetch(url, options)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setResponse(data)
          if(data.status === 'ok'){
            navigate('/succesLogin');
            localStorage.setItem('userToken', data.accessToken);
            let userInfo = {
              "firstName" : data.user.fname,
              "lastName" : data.user.lname,
              "username" : data.user.username,
              "email" : data.user.email,
              "avtar" : data.user.avatar
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setError(false);
          }
          else{
            setError(true)
          }
        })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    (values.username !== '' && values.password !== '' ? setSubmited(true) : setSubmited(false));
    (values.username !== '' && values.password !== '' ? setError(false) : setError(true));
  }

  useEffect(() => {
    if(submited === true){
      fetchData();
      setSubmited(false)
    }
  }, [submited])

  return (
    <div className='login-card'>
      {<div className='message'>{error && response?.status !== 'ok' ? <span className='error-msg'>{response?.message}</span> : null}</div>}
      <h1 className='heading-main'>Login to your Account</h1>
      <div className='input-group'>
        <input type="text" className='input-field' placeholder='Username' value={values.username} onChange={(e) => {setValues({...values, username: e.target.value})}} />
        {error && !values.username ? <span className='error-msg'>Please enter your username</span> : null}
      </div>
      <div className='input-group'>
        <input type="password" className='input-field' placeholder='Password' value={values.password} onChange={(e) => {setValues({...values, password: e.target.value})}} />
        {error && !values.password ? <span className='error-msg'>Please enter your password</span> : null}
      </div>
      <button className='card-btn' onClick={handleSubmit}>Login</button>
      <span className='switch-msg'>Don't have an account? <Link to="register" className='switch-btn'>Register</Link></span>
    </div>
  )
}

export default LoginCard;