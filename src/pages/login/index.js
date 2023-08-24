import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header"
import '/Users/mantas/Desktop/Final-full-stack-project/BloomooD-frontEnd/src/pages/login/style.css'

const Login = () =>{
    const navigate = useNavigate()
const [user, setUser]=useState({email:'',password:''})
const [token, setToken]= useState('')
const [showPassword, setShowPassword] = useState(false)
const handleInput =(e)=>{
    const {name, value} = e.target
    setUser((prevUser)=>({
        ...prevUser,
        [name]:value
    }))
    console.log('something',user)
}
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword)
  }
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful',data);
        setToken(data);
        localStorage.setItem('token', data);
        navigate('/');
  
        // Fetch user data to check if the profile is empty
        const userResponse = await fetch('http://localhost:4000/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${data}`
          }
        });
  
        if (userResponse.ok) {
        //   const userData = await userResponse.json();
        //   if (userData.profile.length === 0) {
        //     // Navigate to create profile page if the profile is empty
        //     navigate('/profile');
        //   } else {
        //     // Navigate to home page
        //     navigate('/');
        //   }
        } else {
          console.error('Failed to fetch user data');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };
    return(
        <>
        <Header userToken={token}/>
        <div className="login">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          {user.email && <label className="input-label-email-login">Email</label>}{' '}
          <br></br>
          <input
          className="email"
            placeholder="Email"
            type="text"
            name="email"
            onChange={handleInput}
            value={user.email}
          />
        </div>
        <div className="input-container">
          {user.password && <label className="input-label-password-login">Password</label>}{' '}
          <br></br>
          <input
          className="password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleInput}
            value={user.password}
          /><div className="eye-icon-login" onClick={handleCheckboxChange}>
    {showPassword ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none" className="icon">
      <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none" className="icon">
        <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )}
  </div>
        <button className="login-button">Login</button>
        </div>
    

        <br />
        {/* {loginResponse && <p className="response">{loginResponse}</p>} */}
      </form>
    </div>
       </>
    )
}
export default Login