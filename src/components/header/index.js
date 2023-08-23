import { useNavigate } from 'react-router-dom'
import './index.css'
import loginSvg from './svg/login-svg.svg'
import logoutSvg from './svg/logout-svg.svg'
import settingsSvg from './svg/settings-svg.svg'
import editProfileSvg from './svg/edit-profile-svg.svg'
import profileSvg from './svg/profile-svg.svg'
import signupSvg from './svg/signup-svg.svg'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import Login from '../../pages/login'
const Header = ()=>{
  const navigate = useNavigate()

const [open, setOpen] = useState(false)
const [openBag, setOpenBag] = useState(false)
const token = localStorage.getItem('token');
useEffect(() => {
  // Get the token from localStorage whenever needed
  const token = localStorage.getItem('token');
  console.log('this is from header', token);
  // Rest of your useEffect code
}, []);
const [user, setUser] = useState()
console.log('user',user)
let menuRef = useRef(null)
let shoppingRef = useRef(null)
useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const response = await fetch('http://localhost:4000/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('userdata',userData)
          setUser(userData);
          console.log("inside", userData)
        } else {
          console.error('Failed to fetch user data');
        }
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
  };

  fetchUser();
}, [token]);
useEffect(() => {
  const handler = (event) => {
    if (!menuRef.current.contains(event.target)) {
      setOpen(false)
    }
  }
  document.addEventListener('mousedown', handler)

  return () => {
    document.removeEventListener('mousedown', handler)
  }
},[])
useEffect(() => {
  const baghandler = (event) => {
    if (!shoppingRef.current.contains(event.target)) {
      setOpenBag(false)
    }
  }
  document.addEventListener('mousedown', baghandler)

  return () => {
    document.removeEventListener('mousedown', baghandler)
  }
},[])
const tokenValidation = () => {
  if (localStorage.getItem('token')) {
    return (
      <div className="dropdown-menu-text">
        <p>
          Welcome to <span>Bloomood</span>
          <br />
          {user && user.profile && user.profile[0] && (
            <p>
              {user.profile[0].firstName} {user.profile[0].lastName}
            </p>
          )}
        </p>
        <ul>
          <DropdownItem img={profileSvg} text={'My Profile'}  />
          <DropdownItem img={editProfileSvg} text={'Edit Profile'} />
          <DropdownItem img={settingsSvg} text={'Settings'} />
          <DropdownItem img={logoutSvg} text={'Logout'} onClick={logout} />
        </ul>
      </div>
    )
  } else {
    return (
      <div className="dropdown-menu-text">
        <p>
          Welcome to <span>Bloomood</span>
          <br />
          Please Sign up or Log in
        </p>
        <ul>
          <DropdownItem img={signupSvg} text={'Sign up'} to='/register'/>
          <DropdownItem img={loginSvg} text={'Log in'} to='/login'/>
        </ul>
      </div>
    )
  }
}
const logout = ()=>{
  localStorage.removeItem('token')
}
const tokenValidationShopping = () => {
  if (localStorage.getItem('token')) {
    return (
      <div className="shopping-bag-text">
        <p>
          {/* {user && user.profile[0].firstName}'s Shopping Bag */}
        </p>
      </div>
    )
  } else {
    return (
      <div className="shopping-bag-text">
        <p>
          Your Shopping Bag
        </p>
        <button>Continue</button>
      </div>
    )
  }
}
  return (
    <header className="main-header" user={user}>
          <button
            className="header-logo"
            onClick={() => navigate('/')}
          ></button>
          <button className="nav-buttons" onClick={() => navigate('/discover')}>
            Discover<span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button className="nav-buttons" onClick={() => navigate('/Products')}>
            Products<span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button className="nav-buttons" onClick={() => navigate('/Blog')}>
            Blog<span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button className="nav-buttons" onClick={() => navigate('/Contacts')}>
            Contacts<span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className='menu-icons-container'>
          <div className="shopping-bag-container" ref={shoppingRef}>
              <div
                className="shopping-bag-trigger"
                onClick={() => {
                  setOpenBag(!openBag)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <div className={`shopping-bag-menu ${openBag ? 'active' : 'inactive'}`}>
                <div className={`shopping-bag ${token ? '' : 'hidden-bag'}`}>
                  {tokenValidationShopping()}
                </div>
              </div>
            </div>
            <div className="menu-container" ref={menuRef}>
              <div
                className="menu-trigger"
                onClick={() => {
                  setOpen(!open)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 21 21"
                  fill="none"
                  stroke="grey"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <div className={`dropdown ${token ? '' : 'hidden'}`}>
                  {tokenValidation()}
                </div>
              </div>
            </div>
          </div>
        </header>
  )
}
const DropdownItem = (props) => {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <li className="dropdownItem" onClick={props.onClick}>
      <img src={props.img} alt='' />
      <Link to={props.to} style={linkStyle}>
        {props.text}
      </Link>
    </li>
  )
}
export default Header