import { useState } from 'react'
import Header from '../../components/header'
import { useNavigate } from 'react-router-dom'
import '/Users/mantas/Desktop/Final-full-stack-project/BloomooD-frontEnd/src/pages/register/index.css'
import countriesList from 'countries-list'
import emailjs from '@emailjs/browser';
const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const handleInput = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }
  const allCountries = Object.values(countriesList.countries).map(
    (country) => country.name
  )
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (response.ok) {
        sendRegistrationEmail()
        console.log('loggin successful')
        navigate('/login')
        setUser({ email: '', password: '', firstName:'', lastName:''})
      } else {
        console.error('login failed')
      }
    } catch (error) {
      console.error('login failed:', error)
    }
  }
  const sendRegistrationEmail = () => {
    const emailParams = {
      user_lastName : user.lastName,
      user_firstName : user.firstName,
      user_email: user.email,
      user_password : user.password
      // Customize the message as needed
    };
  
    emailjs.send(
      'service_6jkgkhp', // Replace with your service ID
      'template_a4ngsmc', // Replace with your template ID
      emailParams,
      'rN98_8iqGQiEdJ9HH' // Replace with your public key
    )
      .then((result) => {
        console.log('Email sent successfully:', result);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  };
  return (
    <>
      <Header />
      <div className="register">
        <h2>REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            {user.email && <label className="input-label-email">Email</label>}{' '}
            <br></br>
            <input
              placeholder="Email"
              type="text"
              name="email"
              onChange={handleInput}
              value={user.email}
            />
          </div>
          <div className="input-container">
            {user.password && (
              <label className="input-label-password">Password</label>
            )}{' '}
            <br></br>
            <input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={handleInput}
            />
            <div className="eye-icon" onClick={handleCheckboxChange}>
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="icon"
                >
                  <path
                    d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="icon"
                >
                  <path
                    d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
            <div className="input-container-profile">
              {user.firstName && (
                <label className="input-label-first-name">First name</label>
              )}{' '}
              <br></br>
              <input
                className="firstname"
                placeholder="First name"
                type="text"
                name="firstName"
                onChange={handleInput}
                value={user.firstName}
              /> 
              {user.lastName && (
                <label className="input-label-last-name">Last name</label>
              )}{' '}
              <br></br>
              <input
                className="lastname"
                placeholder="Last name"
                type="text"
                name="lastName"
                onChange={handleInput}
                value={user.lastName}
              />
            </div>
           
             
          
            <div className="input-container-address">
              {user.street && <label className="input-label-street">Street</label>}{' '}
              <br></br>
              <input
                className="street"
                placeholder="Street"
                type="text"
                name="street"
                onChange={handleInput}
                value={user.street}
              />
              {user.houseNumber && (
                <label className="input-label-house-number">House number</label>
              )}{' '}
              <br></br>
              <input
                className="number"
                placeholder="House number"
                type="text"
                name="houseNumber"
                onChange={handleInput}
                value={user.houseNumber}
              />
     
            </div>

            <div className="input-container-address-line-2">
              {user.city && <label className="input-label-city">City</label>}{' '}
              <br></br>
              <input
                className="city"
                placeholder="City "
                type="text"
                name="city"
                onChange={handleInput}
                value={user.city}
              />{user.postCode && <label className="input-label-post-code">Post code</label>}{' '}
            <br></br>
            <input
              className="postcode"
              placeholder="Post code"
              type="text"
              name="postCode"
              onChange={handleInput}
              value={user.postCode}
            />
            </div>
          </div>
            
            <div className="input-container-address-line-3">
              {user.country && <label className="input-label"></label>}{' '}
              <br></br>
              <select
                className="country"
                name="country"
                value={user.country}
                onChange={handleInput}
              >
                <option value="">Select a country</option>
                {allCountries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          
          <button className="reg-button">Register</button>
        </form>
      </div>
    </>
  )
}
export default Register
