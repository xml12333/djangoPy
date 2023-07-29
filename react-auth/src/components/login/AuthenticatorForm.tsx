import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import qrcode from "qrcode";
import { toast } from 'react-toastify';
export const AuthenticatiorForm = (props: {
  loginData: {
    id: number;
    secret?: string;
    otpauth_url?: string;
  };
  success: Function;
}) => {
  const [code, setCode] = useState("");
  const [img, setImg] = useState<ReactElement|null>(null);

  useEffect(() => {
    if (props.loginData.otpauth_url) {
      qrcode.toDataURL(props.loginData.otpauth_url, (err, data) => {
          setImg(<img src={data} style={{width:'100%'}}/>)
      });
    }
  }, [props.loginData.otpauth_url]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try{
      const { status } = await axios.post("two-factor/", {
        ...props.loginData,
        code,
      });
      if (status === 200) {
        props.success();
      }
  }catch{
    toast("Can't pass tho factor authentication. Try again.")
  }
  };

  return (
      <div>
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">
        Please inser your authenticator code
      </h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="6 digits code"
          onChange={(e) => setCode(e.target.value)}
        />
        <label htmlFor="floatingInput">6 digits code</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
        Submit
      </button>
    </form>

    {img}
    </div>
  );
};
