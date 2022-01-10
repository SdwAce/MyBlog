import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../service/auth-service";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

//create login component for reuse
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    login(e) {
        //prevent default behavior
        e.preventDefault();

        //validate user information
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) { //if no error,do in
            this.setState({
                loading: true,
                message: ""
            });
            AuthService.login(this.state.username, this.state.password).then(
                response => {
                    this.props.history.push("/personal");
                    window.location.reload();
                    this.setState({
                        loading: false
                    });
                },
                error => {
                    const errormessage = ((error.response && error.response.data.toString()) || error.toString());

                    this.setState({
                        message: errormessage,
                        loading: false
                    });
                }
            );
        }
    }
    render() {
        return (
            <div className="row d-flex justify-content-center align-items-center h-100" style={{paddingTop:'3%', paddingBottom:'5%'}}>
                <div className="col-xl-7">
                    <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-5">

                                <h5 className="card-header">Login</h5>
                                <div className = "card-container">
                                    <div className="card-body">
                                        <img
                                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                            alt="profile-img"
                                            className="profile-img-card"
                                        />

                                        <Form onSubmit={this.login} ref={c => {this.form = c;}}>
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    value={this.state.username}
                                                    className="form-control"
                                                    onChange={this.onChangeUsername}
                                                    validations={[required]}
                                                    placeholder={"Enter username"}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.onChangePassword}
                                                    validations={[required]}
                                                    placeholder={"Enter password"}
                                                />
                                            </div>

                                            <div className="form-group button-group">
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    disabled={this.state.loading}
                                                >
                                                    {this.state.loading && (
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                    )}
                                                    <span>Login</span>
                                                </button>
                                            </div>
                                            <hr></hr>

                                            <div className="form-group">
                                                <span>New user? </span>
                                                <a className="small" href="/register">Create an Account!</a>
                                            </div>

                                            {this.state.message && (
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.message}
                                                    </div>
                                                </div>
                                            )}
                                            <CheckButton
                                                style={{ display: "none" }}
                                                ref={c => {
                                                    this.checkBtn = c;
                                                }}
                                            />
                                        </Form>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 d-flex align-items-center gradient-custom-2">
                                <div className="text-white px-3 py-4 loginText">
                                    <h4 className="mb-4 text-center">Welcome to use MyBlog</h4>
                                    <p className="medium mb-0 text-center">We are aiming to share your stories to the world.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
