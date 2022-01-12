import React, {Component} from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {Card, FormGroup, FormLabel} from "react-bootstrap";
import styles from "./commentform.css"
import classNames from "classnames/bind";
import TextareaAutosize from "react-textarea-autosize"
import CommentService from "../../../service/comment-service";
import CommentList from "../CommentList/commentlist";
import AuthService from "../../../service/auth-service";
const cx = classNames.bind(styles);

const required = value => {
    if (!value) {
        return (
            <div className="text-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

//component for both comment list and the form for adding comment
export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.comment = this.comment.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);

        this.state = {
            comment: "",
            comments:[],
            successful: false,
            loading: false,
            message: ""
        };
    }

    responseHandler = response => {
        const result = JSON.parse(JSON.stringify(response));
        this.setState({
            comments: result,
            successful: true,
            loading:false,
            comment:""
        });
    };

    errorHandler = error => {
        this.setState({
            message: "Unexpected error! Please try again!",
            successful: false,
            loading:false,
            comment:""
        });
    };

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        });
    }
    async componentDidMount() {
        const {postId} = this.props;
        await CommentService.getComments(postId).then(
            response => this.responseHandler(response),
            error => this.errorHandler(error)
        )
    }

    comment (e){
        e.preventDefault();
        this.form.validateAll();

        const {postId} = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            this.setState({
                loading:true,
                message:""
            });
            CommentService.addComment(postId,this.state.comment).then(
                response => {
                    CommentService.getComments(postId).then(
                        response =>  this.responseHandler(response),
                        error => this.errorHandler(error)
                    )
                },
                error => this.errorHandler(error)
            );
        }
    }

    render() {
        const isAuthenticated = AuthService.getUser() !== undefined ? true : false;
        return (
            <Card className="bg-opacity-50 bg-info">
                <CommentList comments = {this.state.comments}/>
                {isAuthenticated &&
                    (<Card className={cx('comment-form')}>
                        <div className="card-body">
                            <Form onSubmit={this.comment} ref={c => {this.form = c}}>
                                <FormGroup>
                                    <FormLabel className="mt-0 mb-2">Add your comments here!</FormLabel>
                                    <TextareaAutosize
                                        type="text"
                                        className="form-control"
                                        value={this.state.comment}
                                        onChange={this.onChangeComment}
                                        validations={[required]}
                                        placeholder={"Say something about this post!"}
                                        maxRows="5"
                                    />
                                </FormGroup>

                                <div className="form-group button-group mt-3">
                                    <button className="btn btn-primary btn-block mb-1"
                                            disabled={this.state.loading}
                                    >
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Submit</span>
                                    </button>
                                </div>
                                {this.state.message && (
                                    <div className="form-group">
                                        <div
                                            className={
                                                this.state.successful
                                                    ? "alert alert-successful"
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
                    </Card>
                    )}
                {!isAuthenticated && (
                    <div>
                        <div className="alert alert-success ml-10 mr-4" role="alert" style={{backgroundColor : '#a0f3a9b0'}}>
                            <a className="small" href="/login">Login</a> to create your own posts and make comments!
                        </div>
                    </div>
                )}
            </Card>
        );
    }

}

