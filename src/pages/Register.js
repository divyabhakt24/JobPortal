import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from './../Components/Shared/InputForm';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import Spinner from '../Components/Shared/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");

    //redux state
    const { loading } = useSelector((state) => state.alerts);

    //hoops
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     setValues({
    //         values,
    //         [e.target.name]: value,
    //     });
    // };


    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name || !lastname || !email || !password || !location) {
                return alert('Please Provide All Fields');
            }
            dispatch(showLoading());
            console.log("he");
            const { data } = await axios.post("/api/v1/auth/register", { name, lastname, email, password, location });
            dispatch(hideLoading());
            console.log("he2");
            if (data.success) {
                toast.success('Register Sucessfully');
                navigate('/Login');

            }
        } catch (error) {
            dispatch(hideLoading());
            alert('Invalid Form Details Please Try Again!');
            console.log(error);
        }
    };



    return (
        <>
            {loading ? (
                <Spinner />
            ) : (


                <div className="form-container" onSubmit={handleSubmit}>

                    <form className="card p-2" >
                        <img src="/images/logo.png" alt="logo" height={250} width={400} />

                        <InputForm
                            htmlFor="name"
                            labelText={"Name"}
                            type={"text"}
                            value={name}
                            handleChange={(e) => setName(e.target.value)}
                            name="name"
                        />
                        <InputForm
                            htmlFor="lastName"
                            labelText={"Last Name"}
                            type={"text"}
                            value={lastname}
                            handleChange={(e) => setLastName(e.target.value)}
                            name="lastName"
                        />
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
                        <InputForm
                            htmlFor="location"
                            labelText={"Location"}
                            type={"location"}
                            value={location}
                            handleChange={(e) => setLocation(e.target.value)}
                            name="location"
                        />

                        {/* <div className="mb-1">
                    <label htmlFor="name" className="form-label">
                        Name</label>
                    <input type="text" className="form-control"
                        name="name" value={name}
                        onChange={(e) => setName(e.target.value)}

                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="lastname" className="form-label">
                        Last Name</label>
                    <input type="text" className="form-control"
                        name="name" value={lastname}
                        onChange={(e) => setLastName(e.target.value)}

                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"
                        name="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"
                        name="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>
                <div className="mb-1">
                    <label htmlFor="location" className="form-label">
                        Location</label>
                    <input type="text" className="form-control"
                        name="location" value={location}
                        onChange={(e) => setLocation(e.target.value)}

                    />
                </div> */}
                        <div className='d-flex justify-content-between'>
                            <p>Already Register<Link to="/Login">Login</Link></p>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            )}
        </>

    );
};

export default Register;
