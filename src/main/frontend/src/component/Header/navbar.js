import React, { Component } from "react";
import AuthService from "../../service/auth-service";
import {NavLink} from "react-router-dom";

export default class BarHeader extends Component {
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

    render() {
        return (
            <nav className = "navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <span id = "brand" className="navbar-brand mb-0 h1">MyBlog</span>

                    {this.state.currentUser ? ( //login or not ?
                        <div className = "navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink to={"/home"} exact  className="nav-link" activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className = "navbar-nav ml-auto ">
                            <li className="nav-item">
                                <NavLink to={"/home"} exact  className="nav-link" activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink to={"/login"} activeClassName="active" className="nav-link" >
                                    Login
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to={"/register"}  activeClassName="active" className="nav-link">
                                    Register
                                </NavLink>
                            </li>
                        </div>
                    )}
                </div>
            </nav>

        );
    }
}