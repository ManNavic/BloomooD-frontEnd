import Header from '/Users/mantas/Desktop/Final-full-stack-project/BloomooD-frontEnd/src/components/header/index.js'
import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import '../contactUs/styles.css'

const ContactUs = () => {
    const [contactError, setContactError]= useState([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
  const type = typeof serviceId
  console.log('type', type)
  console.log(
    'REACT_APP_EMAILJS_SERVICE_ID',
    process.env.REACT_APP_EMAILJS_SERVICE_ID
  )
  console.log(
    'REACT_APP_EMAILJS_TEMPLATE_ID_REGISTRATION',
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID_REGISTRATION
  )
  console.log(
    'REACT_APP_EMAILJS_TEMPLATE_ID_CONTACTUS',
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CONTACTUS
  )
  console.log(
    'REACT_APP_EMAILJS_PUBLIC_KEY',
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  )
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CONTACTUS

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Save form data to backend
    try {
      const response = await fetch('http://localhost:4000/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        console.log('Form data saved to database')
        setFormData({firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''})
        setContactError([])
        // Send email using emailjs
        const emailParams = {
          user_firstName: formData.firstName,
          user_lastName: formData.lastName,
          user_email: formData.email,
          subject: formData.subject,
          message: formData.message
        }

        try {
          await emailjs.send(serviceId, templateId, emailParams, publicKey)
          console.log('Email sent successfully')
        } catch (error) {
          console.error('Email sending failed:', error)
        }
        
      } else {
        const responseContact = await response.json()
        setContactError(responseContact.errors)
        console.log(contactError)
        console.error('Failed to save form data to database')
      }
    } catch (error) {
      console.error('Error saving form data:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <>
    <div id='contactUsSection'>
      <div className="contact-us-container">
        <div className="text-container">
          <p className="p1">Have a question?</p>
          <p className="p2">Let's chat!</p>
          <p className="p3">
            Please fill out this quick form and we will get back to you{' '}
          </p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
          <h3 >Contact Us</h3>
          <div className='user-input'>
            
          {formData.firstName && <label className="input-label-contact-first-name">First Name</label>}{' '}
           <br></br>
            <input
              className="input"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              />
            <br />
            {formData.lastName && <label className="input-label-contact-last-name">Last Name</label>}{' '}
            <br></br>
            <input
              className="input"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              />
              </div>
    
            {formData.email && <label className="input-label-contact-email">Email address</label>}{' '}
            <br></br>
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              />
            <br />
            {formData.subject && <label className="input-label-contact-subject">Subject</label>}{' '}
            <br></br>
            <select
              className="input-select"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              >
              <option className="first-select" value="">
                Select a contact reason
              </option>
              <option value="General Question">General Question</option>
              <option value="Order Question">Order Question</option>
              <option value="Product Question">Product Question</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
            <br></br>
            {formData.message && <label className="input-label-contact-message">Message</label>}{' '}
            <br></br>
            <textarea
              className="input-message"
              type="text"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              />
            <br />
            <br></br>
            <button type="submit" className="form-button" >
              Submit
            </button>
            {contactError.length > 0 && (
              <div className="error-messages-contact">
      {contactError.map((error, index) => (
        <p key={index}>{error}</p>
        ))}
  </div>
)}
          </form>
        </div>
      </div>
</div>
    </>
  )
}

export default ContactUs
