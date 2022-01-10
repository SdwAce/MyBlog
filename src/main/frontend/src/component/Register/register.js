import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../service/auth-service";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
        return (
            <div className="text-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


const checkUsername = value => {
    if (value.length < 3 || value.length > 10) {
        return (
            <div className="text-danger" role="alert">
                The username must be 3 to 10 characters long!
            </div>
        );
    }
};

const checkPassword = value => {
    if (value.length < 3 || value.length > 15) {
        return (
            <div className="text-danger" role="alert">
                The password must be 3 to 15 characters long!
            </div>
        );
    }
};

//crate register component for reuse
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            success: false,
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

    register(e) {
        e.preventDefault();

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.setState({
                loading:true,
                message:""
            });
            AuthService.register(
                this.state.username,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        success: true,
                        loading:false
                    });
                },
                error => {
                    const errormessage = ((error.response && error.response.data.toString()) || error.toString());
                    this.setState({
                        message: errormessage,
                        success: false,
                        loading:false
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
                                <h5 className="card-header">Register</h5>
                                <div className = "card-container">
                                    <div className="card-body">
                                        <img
                                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                            alt="profile-img"
                                            className="profile-img-card"
                                        />

                                        <Form onSubmit={this.register} ref={c => {this.form = c;}}>
                                            {/*    only show form when not registered*/}
                                            {!this.state.success && (
                                                <div>
                                                    <div className="form-group">
                                                        <label htmlFor="usernameInput">Username</label>
                                                        <Input
                                                            id="usernameInput"
                                                            type="text"
                                                            className="form-control"
                                                            value={this.state.username}
                                                            onChange={this.onChangeUsername}
                                                            validations={[required,checkUsername]}
                                                            placeholder={"Enter username"}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="passwordInput">Password</label>
                                                        <Input
                                                            id="passwordInput"
                                                            type="password"
                                                            className="form-control"
                                                            value={this.state.password}
                                                            onChange={this.onChangePassword}
                                                            validations={[required, checkPassword]}
                                                            placeholder={"Enter password"}
                                                        />
                                                    </div>

                                                    <div className="form-group button-group">
                                                        <button className="btn btn-primary btn-block"
                                                                disabled={this.state.loading}
                                                        >
                                                            {this.state.loading && (
                                                                <span className="spinner-border spinner-border-sm"></span>
                                                            )}
                                                            <span>Register</span>
                                                        </button>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="form-group">
                                                        <span>Already have account?  </span>
                                                        <a className="small" href="/login"> Login here!</a>
                                                    </div>
                                                </div>
                                            )}
                                            {this.state.success && (
                                                <div>
                                                    <div className="alert alert-success" role="alert">
                                                        User successfully registered!
                                                    </div>

                                                    <hr></hr>
                                                    <div className="form-group">
                                                        <a className="small" href="/login">back to login.</a>
                                                    </div>
                                                </div>
                                            )}

                                            {this.state.message && (
                                                <div className="form-group">
                                                    <div
                                                        className={
                                                            this.state.success
                                                                ? "alert alert-success"
                                                                : "alert alert-danger"
                                                        }
                                                        role="alert"
                                                    >
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