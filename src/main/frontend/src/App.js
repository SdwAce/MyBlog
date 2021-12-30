import './App.css';
import React, { Component } from "react";
import { Switch, Route, Link, NavLink  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./service/auth-service";

import Home from "./component/home-component.js";
import Login from "./component/login-component.js";
import Register from "./component/register-component.js";
import Footer from "./component/footer-component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined
    };
  }

  logOut(){
    AuthService.logout();
  }

  //initialize user
  componentDidMount() {
    const user = AuthService.getUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  render(){
    return (
        <div className="App bg-info">
          <nav className = "navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">MyBlog</span>
            </div>
            <div className= "navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              </div>
            {this.state.currentUser ? ( //login or not ?
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link" activeClassName="active">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to={"/register"}  className="nav-link" activeClassName="active">
                      Register
                    </NavLink>
                  </li>
                </div>
            )}
          </nav>
          {/*part for the possible content to be shown, need route*/}
          <div className="container bg-info">
            <Switch>
              <Route exact path={["/", "/home"]} component ={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>

          </div>
          <Footer />




        </div>
    );
  }
}

export default App;
