import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    // Chức năng gọi API đăng ký (đã được làm gọn để nộp bài)
    let register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
        }),
    });
    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem("username", json.userName);
        window.location.href = window.location.origin;
    } else {
        alert("The user with same username is already registered");
        window.location.href = window.location.origin + "/register";
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", margin: "auto" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="text" style={{ padding: "20px" }}>Sign Up</span>
        <a href="/" onClick={gohome} style={{ padding: "20px" }}>X</a>
      </div>
      <hr />
      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} required/>
          </div>
          <div className="input">
            <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} required/>
          </div>
          <div className="input">
            <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} required/>
          </div>
          <div className="input">
            <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="input">
            <input type="password" name="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required/>
          </div>
        </div>
        <div className="submit_panel">
          <button className="submit" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
