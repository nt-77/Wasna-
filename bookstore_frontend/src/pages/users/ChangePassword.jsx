import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });


    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordData.oldPassword || !passwordData.newPassword) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.patch('http://localhost:5000/api/user/changepassword', passwordData,{withCredentials:true});
            alert('Password changed successfully.');
            console.log(response.data);
        } catch (error) {
            alert('Error changing password: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Old Password:</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
