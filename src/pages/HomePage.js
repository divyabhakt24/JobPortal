import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Homepage.css";



const HomePage = () => {
    return (
        <>
            <img id="bg-img" src="/images/bg.jpeg" />
            <div className="content">
                <div className="card w-30">
                    <img id="logo" src="/images/logo.png" alt="logo" />
                    <div className="card-body" style={{ marginTop: "-60px" }}>
                        <h5 className="card-title">Top rated Career Platform</h5>
                        <hr></hr>
                        <p className="card-text">
                            Search and manage your jobs with ease.<br></br>
                            Find your preferenced job only in Job Genie.
                        </p>
                        <div className="d-flex justify-content-between mt-5">
                            <p><b>New User</b><br></br><Link to="/Register" className="my-btn">Register</Link></p>
                            <p><b>Already A User</b><br></br><Link to="/login" className="my-btn">Login</Link></p>
                        </div>
                    </div>
                </div>
                <div className="footer ">
                    Created by @Divya_Bhakt
                </div>
            </div>

        </>
    );
};

export default HomePage;