import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // navigate
  const navigate = useNavigate();
  // Func
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    // Request to api
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      console.log({ res });
      // SET USER INFO TO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(res.data))
      navigate("/");

    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name='username' type='text' placeholder='Username' required/>
          <input name='password' type='password' placeholder='Password' required/>
          <button disabled={isLoading}>Login</button>
          <Link to='/register'>{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className='imgContainer'>
        <img src='/bg.png' alt='' />
      </div>
    </div>
  );
}

export default Login;
