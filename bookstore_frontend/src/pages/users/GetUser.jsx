import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
        // Replace 'http://localhost:5000' with your actual backend server URL
    //     axios.get('http://localhost:5000/api/user/getuser')
    //     .then((response)=>{        
    //         setUser(response.data);
    //         console.log(user);
    //   }).catch ((error)=> {
    //     console.error(error);
    //   })
    axios
    .get("http://localhost:5000/api/user/getuser",{withCredentials:true})
    .then((response)=>{
console.log("working");
setUser(response.data)
     console.log(response);
    //  setLoading(false)
    })
    .catch((error)=>{
     console.log(error);
    //  setLoading(true)
    })


  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>ID: {user._id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default GetUser;
