import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const RegisterCard = () => {

  const navigate = useNavigate();

  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState(false);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
    const allConditios = Object.values(values).every(value => value.length >= 5)
    
    allConditios ? setSubmited(true) : setSubmited(false);
    allConditios ? setError(false) : setError(true)
    
    }

  const userData = {
    "fname" : values.firstName,
    "lname" : values.lastName,
    "username" : values.username,
    "password" : values.password,
    "email": values.email,
    "avatar" : "https://www.melivecode.com/users/cat.png"
  }

  const url = 'https://www.melivecode.com/api/users/create';
  const options = {
    method: "POST",
    body: JSON.stringify(userData),
    headers : {"Content-type" : "Application/json; charset=UTF-8"}
  }

  const fetchData = () => {
    return(
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          if(data.status === 'ok'){
            localStorage.setItem('registered', 'true')
            navigate('/succesRegister')
          }
        })
    )
  }

  useEffect(() => {
    if(submited){
      fetchData();
      setSubmited(false)
    }
  }, [submited])

  return (
    <div className='register-card'>
      <h1 className='heading-main'>Register your Account</h1>
      <div className='input-group'>
        <input type="text" className='input-field' placeholder='First Name' value={values.firstName} onChange={(e) => {setValues({...values, firstName: e.target.value})}} />
        {error && !values.firstName ? 
          <span className='error-msg'>Please enter a first name</span> : 
            (error && values.firstName.length < 5 ? 
            <span className='error-msg'>First name must have minimum 5 characters</span> : null)}
      </div>
      <div className='input-group'>
        <input type="text" className='input-field' placeholder='Last Name' value={values.lastName} onChange={(e) => {setValues({...values, lastName: e.target.value})}} />
        {error && !values.lastName ? 
        <span className='error-msg'>Please enter a last name</span> : 
          (error && values.lastName.length < 5 ? 
          <span className='error-msg'>Last name must have minimum 5 characters</span> : null)}
      </div>
      <div className='input-group'>
        <input type="text" className='input-field' placeholder='Username' value={values.username} onChange={(e) => {setValues({...values, username: e.target.value})}} />
        {error && !values.username ? 
        <span className='error-msg'>Please enter a username</span> : 
          (error && values.username.length < 5 ? 
          <span className='error-msg'>Username must have minimum 5 characters</span> : null)}
      </div>
      <div className='input-group'>
        <input type="text" className='input-field' placeholder='Email' value={values.email} onChange={(e) => {setValues({...values, email: e.target.value})}} />
        {error && !values.email ? 
        <span className='error-msg'>Please enter a email</span> : 
          (error && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) ? 
          <span className='error-msg'>Enter valid email address</span> : null)}
      </div>
      <div className='input-group'>
        <input type="password" className='input-field' placeholder='Password' value={values.password} onChange={(e) => {setValues({...values, password: e.target.value})}} />
        {error && !values.password ? 
        <span className='error-msg'>Please enter a password</span> : 
          (error && values.password.length < 5 ? 
          <span className='error-msg'>Password must have minimum 5 characters</span> : null)}
      </div>
      <button className='card-btn' onClick={handleSubmit}>Register</button>
      <span className='switch-msg'>Alredy have an account? <Link to="/" className='switch-btn'>Login</Link></span>
    </div>
  )
}

export default RegisterCard