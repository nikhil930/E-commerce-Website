import Jumbotron from "../../components/cards/jumbotron";
import { useState } from "react";
import axios from "axios";    // axios is used to get the response that we recieve by any Get/Post requests to the API endpoint
import toast  from "react-hot-toast";  // used to display the pop-up of error or success on the screen 
import {useAuth} from "../../context/auth";
import { useNavigate, useNavigation } from "react-router-dom";

function Login() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // hook
  const [auth , setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(    // because data property of response(recieved by axios) contains useful info like error or other status
        `
      ${process.env.REACT_APP_API}/login`, // in .env file we have to add REACT_APP in prefix in order to access that variable everyhere
        {email, password }
      );

      if(data?.error){      // ? checks if we data exists or not then access the error in data
        toast.error(data.error);
      } 
      else{
        localStorage.setItem('auth' , JSON.stringify(data));
        // console.log(data);
        setAuth({...auth , token:data.token , user:data.user}); // if login then update the token and user info in context
        toast.success("Login Successfull!!!");
        navigate("/dashboard");
      }    
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try again.")
    }
  };

  return (
    <div>
      <Jumbotron title="Login"></Jumbotron>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset md-3"></div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-4 p-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="form-control mb-4 p-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      {/* <pre>{JSON.stringify(name , null , 4)}</pre> */}
    </div>
  );
}

export default Login;
