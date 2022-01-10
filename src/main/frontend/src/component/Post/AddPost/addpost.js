import React, { Fragment }  from 'react';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import PostService from "../../../service/post-service";
import {FormGroup, CardBody} from "reactstrap";
import {Alert, Button, Card, FormLabel} from "react-bootstrap";
import HeaderImage from "../../Header/HeaderImage";

const required = value => {
    if (!value) {
        return (
            <div className="text-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const checkTitle = value => {
    if (value.length < 1 || value.length > 30) {
        return (
            <div className="text-danger" role="alert">
                The title must not be empty and cannot exceed 30 characters!
            </div>
        );
    }
};


export default class Addpost extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);

        this.state = {
            title: "",
            body: "",
            success: false,
            loading: false,
            message: ""
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeBody(e) {
        this.setState({
            body: e.target.value
        });
    }


    addPost(e) {
        e.preventDefault();

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.setState({
                loading:true,
                message:""
            });
            PostService.createPost(
                this.state.title,
                this.state.body
            ).then(
                response => {
                    this.setState({
                        message: response.data,
                        successful: true,
                        loading:false
                    });
                },
                error => {
                    const errormessage = ((error.response && error.response.data.toString()) || error.toString());
                    this.setState({
                        message: errormessage,
                        successful: false,
                        loading:false
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="container-ld container-home pt-0 pb-5" style={{minHeight: '90%',padding:'0'}}>
                <div className="row-cols-xl-6 d-flex justify-content-center align-items-center h-100 mt-10"style={{backgroundColor:'#b1c4d5', padding:'3% 0'}}>
                    <div className="col-xl-11">
                        <Card className= "rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <h5 className="card-header">Add a new post</h5>
                                    <div>
                                        <CardBody>
                                            <Form onSubmit={this.addPost} ref={c => {this.form = c;}}>
                                                {/*    only show form when not successfully submitted the form*/}
                                                {!this.state.successful && (
                                                    <div>
                                                        <FormGroup>
                                                            <FormLabel htmlFor="titleInput">Title</FormLabel>
                                                            <Input
                                                                id="titleInput"
                                                                type="text"
                                                                className="form-control"
                                                                value={this.state.title}
                                                                onChange={this.onChangeTitle}
                                                                validations={[required,checkTitle]}
                                                                placeholder={"title"}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormLabel>Content</FormLabel>
                                                            <Textarea
                                                                style={{width: '100%',minHeight: '20vh',maxHeight: '30vh'}}
                                                                className="form-control"
                                                                value={this.state.body}
                                                                onChange={this.onChangeBody}
                                                                validations={[required]}
                                                                rows="20"
                                                                placeholder={"Share something you want!"}
                                                            />
                                                        </FormGroup>

                                                        <FormGroup className="button-group" style={{textAlign:'left'}}>
                                                            <Button className="btn  bg-danger"
                                                                    href="/personal"
                                                                    disabled={this.state.loading}
                                                            >
                                                                <span>Back</span>
                                                            </Button>

                                                            <Button className="btn bg-success"
                                                                    type="submit"
                                                                    disabled={this.state.loading}
                                                                    style={{marginLeft:'58%'}}
                                                            >
                                                                {this.state.loading && (
                                                                    <span className="spinner-border spinner-border-sm"></span>
                                                                )}
                                                                <span>Add Post</span>
                                                            </Button>
                                                        </FormGroup>


                                                    </div>
                                                )}
                                                {this.state.successful && (
                                                    <div>
                                                        <Alert variant="success">
                                                            <Alert.Heading>Success</Alert.Heading>
                                                            <p>
                                                                "Your Post was added successfully!
                                                                Continue your trip by adding more posts or comment on
                                                                other posts!"
                                                            </p>
                                                        </Alert>

                                                        <hr></hr>
                                                        <div className="form-group">
                                                            <a className="small" href="/personal">Check your posts.</a>
                                                        </div>
                                                    </div>
                                                )}

                                                {this.state.message && (
                                                    <div className="form-group">
                                                        <div
                                                            className={
                                                                this.state.successful
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
                                        </CardBody>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <HeaderImage/>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}