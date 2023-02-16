import { useState } from "react"
import React from 'react'
import AuthService from "../services/authservice";
import { useNavigate } from 'react-router-dom';

function DashboardT() {

    const [prn, setPrn] = useState("");
    const [sub, setSub] = useState("");
    let [marks, setMarks] = useState({});
    const [submark, setSubMark] = useState(0);
    const navigate = useNavigate();

    function submitForm(event) {
        event.preventDefault()
        const entry = { prn: prn, token:localStorage.getItem("TOKEN") };
        console.log(entry);
        console.log("Form submitted")
        AuthService.getData(entry)
        .then((res)=>{
            setMarks(res[0]);
        })
        .then(()=>{
            // console.log(marks.sub1)
        })
    }

    function handleLogout() {
        AuthService.logout();
        if (!localStorage.getItem("TOKEN")) {
          navigate("/login");
        }
      }

      function insertData(event) {
        event.preventDefault()
        const data = {};
        data.id = marks.id;
        data.sub = sub;
        data.mark = submark;

        AuthService.updateData(data)
        .then(
            (err)=>{
                console.log(err);
            },
            (res)=>{
                console.log(res);
                marks.sub1 = submark;
                setMarks(marks);
            }
        );
      }

  return (
    <>
        <button onClick={handleLogout} className="profile">Logout</button>
        <div className='container'>
            <form onSubmit={submitForm} action="" method="POST">
                <div className="mb-3">
                    <input type="text" value={prn} onChange={(event) => { setPrn(event.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' placeholder='2020BTECS00000' required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className='row justify-content-center, container, col-auto, my-top'>
        <table className='table table-responsive'>
          <thead>
            <tr>
              <th>Sub1</th>
              <th>Sub2</th>
              <th>Sub3</th>
              <th>Sub4</th>
              <th>Sub5</th>
              <th>Sub6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{marks.sub1}</td>
              <td>{marks.sub2}</td>
              <td>{marks.sub3}</td>
              <td>{marks.sub4}</td>
              <td>{marks.sub5}</td>
              <td>{marks.sub6}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='container card'>
            <form onSubmit={insertData} action="" method="POST">
            <div className="">
                <label htmlFor="exampleInputEmail1" className="form-label">Select subject</label>
                    <input type="text" value={sub} onChange={(event) => { setSub(event.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' placeholder='Sub1' required />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter Marks</label>
                    <input type="number" value={submark} onChange={(event) => { setSubMark(parseInt(event.target.value)) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' placeholder='90' required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
  )
}

export default DashboardT