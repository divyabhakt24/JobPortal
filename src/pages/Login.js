import React, { useState } from 'react';
import InputForm from '../Components/Shared/InputForm';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { toast } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.alerts);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/auth/Login',
                { email, password });
            if (data.success) {
                dispatch(hideLoading());
                localStorage.setItem('tokento', data.token)
                toast.success("Login Sucessfully");
                navigate('/dashboard');
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Invalid Credential please try again");
            console.log(error);
        }
    };

    return (
        <>

            <div className="form-container" onSubmit={handleSubmit}>

                <form className="card p-2" >
                    <img src="/images/logo.png" alt="logo" height={250} width={400} />


                    <InputForm
                        htmlFor="email"
                        labelText={"Email"}
                        type={"email"}
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                        name="email"
                    />
                    <InputForm
                        htmlFor="password"
                        labelText={"Password"}
                        type={"password"}
                        value={password}
                        handleChange={(e) => setPassword(e.target.value)}
                        name="password"
                    />


                    <div className='d-flex justify-content-between'>
                        <p>Not A User <Link to="/Register">Register</Link></p>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login;
