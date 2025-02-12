import { useContext, useState } from 'react';
import './Login.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login =()=>{
    const[credentilas,setcredentilas]= useState(
        {
            username:undefined,
            password:undefined
        }
    );

    const {user, loading,error,dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handlechange =(e)=>{
        setcredentilas(prev=>({...prev,[e.target.id]:e.target.value}))

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try{
            const res = await axios.post('http://localhost:5000/auth/login',credentilas);
            console.log("Api data",res.data);
            dispatch({type:"LOGIN_SUCCESSFUL",payload:res.data.details});
            navigate("/");
        }catch(err){
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data});
        }
        
    };
    console.log(user);


    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder='username' id='username' className='lInput' onChange={handlechange} />
                <input type="password" placeholder='password' id='password' className='lInput' onChange={handlechange} />
                <button className='blogin' onClick={handleSubmit} disabled={loading}>login</button>
                {error && <span>{error.message} </span>}
            </div>
        </div>
    )
}
export default Login;