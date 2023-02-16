import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import DashboardT from './components/dashboardT';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
        <Route exact path='/dashboardT' element={<DashboardT/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
