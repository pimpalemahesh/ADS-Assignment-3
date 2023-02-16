import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import AuthService from '../services/authservice';

function Dashboard() {
  const { state } = useLocation();

  const { marks, message, result } = state.response;

  const navigate = useNavigate();

  function handleLogout() {
    AuthService.logout();
    if (!localStorage.getItem("TOKEN")) {
      navigate("/login");
    }
  }

  return (
    <div>
      <button className='my-3' onClick={handleLogout} style={{ float: "right" }}>LogOut</button>
      <h2 className='text-center text-primary'>This is dashboard</h2>
      <div className='profile'>
        <h3>User</h3>
        <ul>
          <li>{result.user.email}</li>
          <li>{result.user.role}</li>
        </ul>
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

      {console.log(message)}
      {console.log(result)}
    </div>

  )
}

export default Dashboard