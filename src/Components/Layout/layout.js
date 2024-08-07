import React from 'react';
import '../../Styles/layout.css';
import { UserMenu } from './Menus/UserMenu';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const layout = ({ children }) => {
    const sidebarMenu = UserMenu;

    const handleLogout = () => {
        localStorage.clear();
        toast.success('Logout')
    }
    return (
        <>
            <div className='row'>
                <div className="col-md-3 sidebar">
                    <div className="logo">
                        <h6>Job Genie</h6>
                    </div>
                    <hr />
                    <p className='text-center text-warning'>Welcome :username</p>
                    <hr />
                    <div className='menu'>
                        {sidebarMenu.map(menu => {
                            return (
                                <div className='menu-item'>
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu}</Link>
                                </div>
                            );
                        })}
                        <div className='menu-item' onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to='/Login'>Logout</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">children</div>

            </div>
        </>
    )
}

export default layout;
