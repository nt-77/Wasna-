import { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from './data';
import logo from './logo.jpeg';
import { useAuth } from '../auth/AuthContext';
import Logout from '../pages/users/Logout';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const { currentUser } = useAuth();

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    if (linksRef.current) {
      const linksHeight = linksRef.current.getBoundingClientRect().height;
      linksContainerRef.current.style.height = showLinks ? `${linksHeight}px` : '0px';
    }
  }, [showLinks]);

  return (
    <nav className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <img src={logo} alt="logo" className="h-10" />
          <h1 className='text-blue-500 font-algerian ml-2'>WASNA EVENT COMPLEX</h1>
          <button className="text-primary-500 hover:text-primary-700 transition duration-300 ease-in-out transform hover:rotate-90 text-2xl md:hidden" onClick={toggleLinks}>
            <FaBars />
          </button>

          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <ul className="flex items-center justify-center space-x-4">
              {links.map((link) => (
                <li key={link.id} className="text-gray-700 capitalize hover:bg-primary-100 hover:text-primary-500 transition duration-300 ease-in-out py-2 px-4">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>

          <ul className="hidden md:flex items-center space-x-4">
            {currentUser ? (
            <Logout/>
            ) : (
              <li>
                <a href="/login" className="text-blue-400 font-bold hover:text-blue-600 transition duration-300 ease-in-out">
                  Sign In
                </a>
              </li>
            )}
          </ul>
        </div>

        <div ref={linksContainerRef} className={`w-full transition-all duration-700 ease-in-out ${showLinks ? 'max-h-96' : 'max-h-0'} overflow-hidden md:hidden`}>
          <ul ref={linksRef} className="flex flex-col items-center justify-center space-y-4 py-4">
            {links.map((link) => (
              <li key={link.id} className="text-gray-700 capitalize hover:bg-primary-100 hover:text-primary-500 transition duration-300 ease-in-out px-4">
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
            {/* Add Auth Link for Mobile View */}
            {currentUser ? (
            //   <li className="text-blue-700 capitalize hover:bg-primary-100 hover:text-blue-500 transition duration-300 ease-in-out px-4">
            //     {/* <a href="/logout">Logout</a> */}
            //     <Logout />
            //   </li>
            <Logout/>
            ) : (
              <li className="text-gray-700 capitalize hover:bg-primary-100 hover:text-primary-500 transition duration-300 ease-in-out px-4">
                <a href="/login">Sign In</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// import { useState, useRef, useEffect } from 'react';
// import { FaBars } from 'react-icons/fa';
// import { links, social } from './data';
// import logo from './logo.svg';
// import {useAuth} from '../auth/AuthContext'

// const Navbar = () => {
//   const [showLinks, setShowLinks] = useState(false);
//   const linksContainerRef = useRef(null);
//   const linksRef = useRef(null);
//   const {currentUser} = useAuth();


//   const toggleLinks = () => {
//     setShowLinks(!showLinks);
//   };

//   useEffect(() => {
//     if (linksRef.current) {
//       const linksHeight = linksRef.current.getBoundingClientRect().height;
//       linksContainerRef.current.style.height = showLinks ? `${linksHeight}px` : '0px';
//     }
//   }, [showLinks]);

//   return (
//     <nav className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-3">
//           <img src={logo} alt="logo" className="h-10" />

//           <div className="hidden md:flex md:items-center md:justify-center flex-1">
//             <ul className="flex items-center justify-center space-x-4">
//               {links.map((link) => {
//                 return (
//                   <li key={link.id} className="text-gray-700 capitalize hover:bg-primary-100 hover:text-primary-500 transition duration-300 ease-in-out py-2 px-4">
//                     <a href={link.url}>{link.text}</a>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           <button className="text-primary-500 hover:text-primary-700 transition duration-300 ease-in-out transform hover:rotate-90 text-2xl md:hidden" onClick={toggleLinks}>
//             <FaBars />
//           </button>
//           <ul className="hidden md:flex items-center space-x-4">
//             {social.map((icon) => {
//               return (
//                 <li key={icon.id}>
//                   <a href={icon.url} className="text-primary-500 hover:text-primary-300 transition duration-300 ease-in-out">
//                     {icon.icon}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         {/* This container now adapts for mobile view only */}
//         <div ref={linksContainerRef} className={`w-full transition-all duration-700 ease-in-out ${showLinks ? 'max-h-96' : 'max-h-0'} overflow-hidden md:hidden`}>
//           <ul ref={linksRef} className="flex flex-col items-center justify-center space-y-4 py-4">
//             {links.map((link) => {
//               return (
//                 <li key={link.id} className="text-gray-700 capitalize hover:bg-primary-100 hover:text-primary-500 transition duration-300 ease-in-out px-4">
//                   <a href={link.url}>{link.text}</a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





//original:
// import { useState, useRef, useEffect } from 'react';
// import { FaBars } from 'react-icons/fa';
// import { links, social } from './data';
// import logo from './logo.svg';

// const Navbar = () => {
//   const [showLinks, setShowLinks] = useState(false);
//   const linksContainerRef = useRef(null);
//   const linksRef = useRef(null);

//   const toggleLinks = () => {
//     setShowLinks(!showLinks);
//   };

//   useEffect(() => {
//     if (linksRef.current) {
//       const linksHeight = linksRef.current.getBoundingClientRect().height;
//       linksContainerRef.current.style.height = showLinks ? `${linksHeight}px` : '0px';
//     }
//   }, [showLinks]);

//   return (
//     <nav className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
//         <div className="flex items-center justify-between w-full">
//           <img src={logo} alt="logo" className="h-10" />
//           <button className="text-primary-500 hover:text-primary-700 transition duration-300 ease-in-out transform hover:rotate-90 text-2xl md:hidden" onClick={toggleLinks}>
//             <FaBars />
//           </button>
//         </div>

//         {/* Ensure the links container is not hidden on larger screens by removing the inline style for height on larger screens */}
//         <div ref={linksContainerRef} className={`transition-all duration-700 ease-in-out ${showLinks || 'md:h-auto'} overflow-hidden md:overflow-visible`}>
//           <ul ref={linksRef} className="flex flex-col md:flex-row items-center md:space-x-4">
//             {links.map((link) => {
//               return (
//                 <li key={link.id} className="text-gray-700 capitalize hover:bg-primary-100 hover:text-primary-500 transition duration-300 ease-in-out py-2 px-4">
//                   <a href={link.url}>{link.text}</a>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <ul className="hidden md:flex items-center space-x-4">
//           {social.map((icon) => {
//             return (
//               <li key={icon.id}>
//                 <a href={icon.url} className="text-primary-500 hover:text-primary-300 transition duration-300 ease-in-out">
//                   {icon.icon}
//                 </a>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import { useState, useRef, useEffect } from 'react';
// import { FaBars } from 'react-icons/fa';
// import { links, social } from './data';
// import logo from './logo.svg';

// const Navbar = () => {
//   const [showLinks, setShowLinks] = useState(false);
//   const linksContainerRef = useRef(null);
//   const linksRef = useRef(null);

//   const toggleLinks = () => {
//     setShowLinks(!showLinks);
//   };

//   useEffect(() => {
//     if (linksRef.current) {
//       const linksHeight = linksRef.current.getBoundingClientRect().height;
//       linksContainerRef.current.style.height = showLinks ? `${linksHeight}px` : '0px';
//     }
//   }, [showLinks]);

//   return (
//     <nav className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
//         <div className="flex items-center">
//           <img src={logo} alt="logo" className="h-10 mr-4" />
//           <button className="text-primary-500 hover:text-primary-700 transition duration-300 ease-in-out transform hover:rotate-90 text-2xl md:hidden" onClick={toggleLinks}>
//             <FaBars />
//           </button>
//         </div>
//         <ul className="hidden md:flex items-center space-x-4">
//           {social.map((icon) => {
//             return (
//               <li key={icon.id}>
//                 <a href={icon.url} className="text-primary-500 hover:text-primary-300 transition duration-300 ease-in-out">
//                   {icon.icon}
//                 </a>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//       {/* Links container outside the top flex row to ensure it drops down below the navbar content */}
//       <div ref={linksContainerRef} className={`mx-auto px-4 sm:px-6 lg:px-8 ${showLinks ? 'max-h-96' : 'max-h-0'} overflow-hidden transition-all duration-700 ease-in-out`}>
//         <ul ref={linksRef} className="flex flex-col md:flex-row justify-center md:space-x-4 w-full">
//           {links.map((link) => {
//             return (
//               <li key={link.id} className="text-gray-700 capitalize hover:bg-primary-100 hover:text-primary-500 transition duration-300 ease-in-out py-2 px-4">
//                 <a href={link.url}>{link.text}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

