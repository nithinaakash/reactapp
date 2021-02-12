import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddMeeting from "./components/add-Meeting.component";
import Meeting from "./components/Meeting.component";
import MeetingsList from "./components/Meetings-list.component";
import Login from "./Login.js"

class App extends Component {
  componentDidMount() {
    sessionStorage.setItem("loggedIn", "false");
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/meetings"} className="navbar-brand">
            Cerner
          </Link>
          <div className="navbar-nav mr-auto">
            {sessionStorage.getItem("loggedIn") === "true" ? (
              <li className="nav-item">
                <Link to={"/meetings"} className="nav-link">
                  Display Associate List
              </Link>
              </li>
            ) : (
                <li></li>
              )}
            {sessionStorage.getItem("loggedIn") === "true" ? (
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Meeting Notes
              </Link>
              </li>
            ) : (
                <li></li>
              )}
          </div>

        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/meetings" component={MeetingsList} />
            <Route exact path="/add" component={AddMeeting} />
            <Route path="/meetings/:id" component={Meeting} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/">
              {sessionStorage.getItem("loggedIn") === "true" ? (
                <Redirect to="/login" />
              ) : (
                  <Redirect to="/" />
                )}
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
