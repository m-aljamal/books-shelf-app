import React from 'react';
import avatar from './student.svg'
import './UserProfile.scss'
function UserProfile(props) {
    console.log(props)
    return (

        <div className='user_container'>
            <div className='avatar'>
                <img src={avatar}/>
            </div>
            <div className='info'>
                <div><span>Name:</span> {props.user.login.name}</div>
                <div><span>Lastname:</span> {props.user.login.lastname}</div>
                <div><span>Email:</span>{props.user.login.email}</div>

            </div>
        </div>
    );
}

export default UserProfile;