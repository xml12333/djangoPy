import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from 'react-toastify';
export const LoginForm = (props: {
  loginData: Function;
  success: Function;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try{
    const { data } = await axios.post("login/", {
      email: email,
      password: password,
    });
    props.loginData(data);
  }catch{
    toast("Woops! Email and password are correct? Try again.")
  }
  };
  const onSuccess = async (googleUser: any) => {
    const { status } = await axios.post("google-auth/", {
      token: googleUser.credential,
    });
    if (status === 200) {
      props.success();
    }
  };

  const onFailure = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="mb-3">
          <Link to="/forgot">Forgot password</Link>
        </div>
        <button className="w-100 btn btn-lg btn-primary " type="submit">
          Sign in
        </button>
      </form>
      <div className="mt-3 w-100">
        <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
      </div>
    </div>
  );
};
