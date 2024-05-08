import {  FaFacebook} from 'react-icons/fa';
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

export const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: '/about',
    text: 'about',
  },
  {
    id: 3,
    url: '/projects',
    text: 'projects',
  },
  {
    id: 4,
    url: '/contact',
    text: 'contact',
  },
  {
    id: 5,
    url: '/profile',
    text: 'profile',
  },
];

export const social = [
  {
    id: 1,
    url: 'https://www.facebook.com/wasnaeventcomplex/',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.instagram.com/wasnaeventcomplex_/?hl=en',
    icon: <FaInstagram />,
  },
  {
    id: 3,
    url: 'https://www.youtube.com/channel/UC5Z1z5dEhl3_9iDdDPV9VcQ',
    icon: <IoLogoYoutube />,
  }
];
