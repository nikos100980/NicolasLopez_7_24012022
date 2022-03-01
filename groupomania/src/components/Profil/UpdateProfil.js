import React from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../Sidebar/SideBar';
import UploadImage from './UploadImage';

const UpdateProfil = () => {

    const userData = useSelector((state)=>state.userReducer);
    return (
        <div className='profil-container'>
            <SideBar />
            <h1>Profil de {userData.firstname}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    {userData.picture ?
                            <img
                                src={userData.picture}
                                alt="user"
                                key={"userImage" + userData.id}
                            /> : 
                            <img
                                src={"http://localhost:8080/images/undefined.jpeg"}
                                alt="user"
                            />
                        }
                    <UploadImage />
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;