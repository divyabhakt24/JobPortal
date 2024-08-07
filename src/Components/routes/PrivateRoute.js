import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../../redux/features/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const getUSer = async () => {
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/user/getUser',
                { token: localStorage.getItem('token') }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading());
            if (data.success) {
                dispatch(setUser(data.data));
            } else {
                localStorage.clear();
                <Navigate to="/Login" />
            }
        } catch (error) {
            localStorage.clear();
            dispatch(hideLoading());
            console.log(error);

        }
    };
    useEffect(() => {
        if (!user) {
            getUSer();
        }
    });
    if (localStorage.getItem('token')) {
        return children;
    }
    else {
        return <Navigate to="/Login" />;
    }
};

export default PrivateRoute;
