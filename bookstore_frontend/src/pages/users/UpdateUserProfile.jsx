import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        bio: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // axios
        // .patch('http://localhost:5000/api/user/updateuser', formData)
        // .then((response) => {
        //     alert('User updated successfully!');
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
        try {
        await axios.patch('http://localhost:5000/api/user/updateuser', formData,{withCredentials:true});
            alert('User updated successfully!');
        } catch (error) {
            alert('Failed to update user. Error: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Bio:</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default UpdateUserProfile;
