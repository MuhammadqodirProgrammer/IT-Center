import React, { useState } from "react";
import "./Login.scss";
import Img1 from "../../assets/image/login-v2-dark 1.svg";
import Img3 from "../../assets/image/astrolab-tizim-oq 2.svg";
import apiRoot from "../../store/apiRoot";
import { useNavigate } from "react-router-dom";
import noeye_btn from "../../assets/image/mdi_show.svg";
import eye from '../../assets/image/eyeactive.svg'
import { error } from "../../services/Error";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [psw, setPsw] = useState("");
  const [states, setStates] = useState(false);
  const workerToken = localStorage.getItem("worker-token");
  const navigate = useNavigate()
  const toggleBtn = () => {
    setStates((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: psw,
      username: username,
      fcm_token: workerToken,
    };
    apiRoot.post("/v1/login", data).then((response) => {
      console.log(response, "response");
      localStorage.setItem("access_token", response?.data?.access_token);
      window.location.reload();
    }).catch((err)=>{
      if(err){
        error()
      }
    })
  };
  return (
    <div className="all">
      <div className="right">
        <div className="all_img">
          <div>
            <img src={Img1} alt="img" />
          </div>
        </div>
      </div>
      <div className="left">
        <div className="all_txt d-grid">
          <img className="img_sticker" src={Img3} alt="sticker" />
          <h1 className="all_h1">IT-Center tizimga
            xush kelibsiz! </h1>
        </div>
        <form className="login_form" onSubmit={(e) => onSubmit(e)}>
          <div className="flex">
            <label className="first_label" htmlFor="login">
              LOGIN
            </label>
            <input
              type="login"
              name="login"
              placeholder="Login"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex psw_input">
            <div className="top_txt">
              <label className="first_label" htmlFor="login">
                PAROL
              </label>
              <a href="#" className="refresh_pass">
                Parolni unutdingizmi?
              </a>
            </div>
            <input
              type={states ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="pass"
              onChange={(e) => setPsw(e.target.value)}
            />
            <div className="eye_btn" onClick={toggleBtn}>
              {states ? (
                <img src={noeye_btn} alt="eye" />
              ) : (
                <img src={eye} alt="eye" />
              )}
            </div>
          </div>
          <div className="save_check">
            <input className="check" type="checkbox" name="check" id="check" />
            <label className="save" htmlFor="check">
              Meni eslab qol
            </label>
          </div>
          <button className="enter_btn">Kirish</button>
        </form>
        <div className="bottom">

        </div>
      </div>
    </div>
  );
};
export default Login;
