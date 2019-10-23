import React from 'react';
import './App.css';
import {Route, Link} from "react-router-dom";
import {ConnectLoginFormik, RegisterFormik} from "./components/Forms";
import PrivateRoute from "./components/PrivateRoute";
import SignOut from "./components/SignOut";
import TicketMaker from "./components/TicketMaker";
import Dashboard from "./components/Dashboard";
import {connect} from "react-redux";
import {setLoginStatus} from "./actions";
import {setUserInfo} from "./actions";

function App(props) {
  props.setLoginStatus(localStorage.getItem("token") !== null);
  props.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));

  return (
    <div className="App">
        {
          props.loginStatus ?
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/sign_out">Sign out</Link>
            </li>
            <li>
              <Link to="/new_ticket">Create new ticket</Link>
            </li>
          </ul>
          :
          (
          <ul>
            <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
          )
        }

      <Route path="/login" component={ConnectLoginFormik}/>
      <Route path="/sign_out" component={SignOut}/>
      <Route path="/register" component={RegisterFormik}/>
      <PrivateRoute path="/new_ticket" component={TicketMaker}/>
      <PrivateRoute exact path="/" component={Dashboard}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {loginStatus: state.loginStatus};
}

export default connect(mapStateToProps, {setLoginStatus, setUserInfo})(App);
// export default App;