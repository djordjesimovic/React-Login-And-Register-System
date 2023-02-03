import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"

const SuccesRegister = () => {

    const navigate = useNavigate();
    const [acces, setAcces] = useState(false)

    useEffect(() => {
      if(localStorage.getItem('registered') !== 'true'){
        navigate('/');
        setAcces(false)
      }
      else{
        setAcces(true)
      }
    }, [])

    const login = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            {acces ? 
                <div className='succes-wrapper'>
                    <h1> Congratulations, you have successfully registered your account!</h1>
                    <button className='login-btn' onClick={login}>Login to your account</button>
                </div>
            : null
            }
        </div>
    )
}

export default SuccesRegister