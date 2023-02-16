import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from 'react'
import AuthService from "../services/authservice";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState([]);

    const navigate = useNavigate();


    function submitForm(event) {
        event.preventDefault()
        const entry = { email: email, password: password };
        setUserData([...userData, entry]);
        console.log("Form submitted")
        AuthService.login(entry).then(
            (response) => {
                console.log(response.user.role)
                if(response.user.role === 'Student'){
                    AuthService.verify(response.token).then(
                        (response)=>{
                            console.log(response);
                            navigate("/dashboard", {
                                state: {
                                  response
                                }
                              });
                            window.location.reload();    
                        },
                        (error)=>{
                            console.log("Error" + error);
                        }
                    )
                } else{
                    AuthService.verify(response.token).then(
                        (response)=>{
                            console.log(response);
                            navigate("/dashboardT", {
                                state: {
                                  response
                                }
                              });
                            window.location.reload();    
                        },
                        (error)=>{
                            console.log("Error" + error);
                        }
                    )
                }
                
            },
            (error) => {
                console.log("Error" + error);
            });
    }

    return (
        <>
            <div className='container text-center my-3'>
                <h2>Login Here</h2>
            </div>
            <div className='container my-3 py-3'>
                <form onSubmit={submitForm} action="" method="POST">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' placeholder='abc@email.com' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} className="form-control" id="exampleInputPassword1" autoComplete='off' placeholder='Sj3x901b' required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div>
                {
                    userData.map((user) => {
                        return <div className="container">
                            <p>Email : {user.email} Password : {user.password}</p>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default Login