import { useState } from "react"
import React from 'react'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState([]);

    function submitForm(event){
        event.preventDefault()
        const entry = {email:email, password:password};
        setUserData([...userData, entry]);
        console.log(userData);
        console.log(entry)
        console.log("Form submitted")
    }
    return (
        <>
            <div className='container text-center my-3'>
                <h2>Register Here</h2>
            </div>
            <div className='container my-3 py-3'>
                <form onSubmit={submitForm} action="" method="POST">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' placeholder='abc@email.com' required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}} className="form-control" id="exampleInputPassword1" autoComplete='off' placeholder='Sj3x901b' required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div>
                {
                    userData.map((user)=>{
                        return <div className="container">
                            <p>Email : {user.email} Password : {user.password}</p>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default Register