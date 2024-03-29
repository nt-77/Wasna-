// import React from 'react';
// import { Route } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';
// import { useNavigate } from 'react-router-dom';


// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const { user } = useAuth();
//   const navigate = useNavigate();

  
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           user ? <Component {...props} /> : navigate('/login')
//         }
//       />
//     );
//   };

// export default PrivateRoute;
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';

// const PrivateRoute = ({ children }) => {
//     const { user } = useAuth();
  
//     // If there's no user, redirect to the login page
//     return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser === null) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
