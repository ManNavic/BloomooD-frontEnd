import { useState } from "react";
import emailjs from '@emailjs/browser'
import './styles.css'
import Header from '/Users/mantas/Desktop/Final-full-stack-project/BloomooD-frontEnd/src/components/header/index.js'

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [retrievedPassword, setRetrievedPassword] = useState('');
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID_TWO
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY_TWO
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_FORGOT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.newPassword) {
          setRetrievedPassword('Password has been changed');
          const emailParams = {
            user_firstName: data.user.profile[0].firstName,
            user_lastName: data.user.profile[0].lastName,
            user_email: data.user.email,
            user_newPassword: data.newPassword,
        
          }
  
          try {
            await emailjs.send(serviceId, templateId, emailParams, publicKey)
            console.log('Email sent successfully')
          } catch (error) {
            console.error('Email sending failed:', error)
          }
          setFormData({email:''})
        }
      } else {
        const errorData = await response.json();
        console.log( errorData);
      }
    } catch (error) {
      console.error('Error retrieving password:', error);
    }
  };

  return (
    <>
    <div className="App-main">

    <Header />
    <div className="forgot-cont">

    <div className="forgot-container">
        <h3>Forgot password</h3>
          <form onSubmit={handleSubmit}>
          {formData.email && <label className="forgot-email">Email</label>}{' '}
              <br/>
              <input
                  className="forgot-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address" /><br />
              <button type="submit" className="forgot-button">
                  Submit
              </button>
          </form>
          {retrievedPassword && (
            <div>
                  <p>{retrievedPassword}</p>
              </div>
          )}
          </div>
          </div>
      </div></>
  );
};

export default ForgotPassword;
