import Jumbotron from "../../components/cards/jumbotron";
import { useState } from "react";
import axios from "axios";    // axios is used to get the response that we recieve by any Get/Post requests to the API endpoint
import toast  from "react-hot-toast";  // used to display the pop-up of error or success on the screen 
import { useAuth } from "../../context/auth";
import { useNavigate, useNavigation } from "react-router-dom";
function Register() {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth  ,setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(    // because data property of response(recieved by axios) contains useful info like error or other status
        `
      ${process.env.REACT_APP_API}/register`, // in .env file we have to add REACT_APP in prefix in order to access that variable everyhere
        { name, email, password }
      );

      if(data?.error){      // ? checks if we data exists or not then access the error in data
        toast.error(data.error);
      } 
      else{
        localStorage.setItem('auth' , JSON.stringify(data));
        setAuth({...auth , token: data.token , user: data.user}); 
        toast.success("Registration Successfull!!!");
        navigate('/dashboard');
      }    
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again.")
    }
  };

  return (
    <div>
      <Jumbotron title="Register"></Jumbotron>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset md-3"></div>
          <form onSubmit={handleSubmit}>
            <input
              type="name"
              className="form-control mb-4 p-2"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            ></input>
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

export default Register;
