import React, {Fragment} from "react";
import classNames from "classnames/bind";
import styles from "./singlepostview.css"
import CommentForm from "../../Comments/CommentForm/commentform";
import {useLocation} from "react-router-dom";
import {Button, Card, FormGroup} from "react-bootstrap";
import AuthService from "../../../service/auth-service";

const cx = classNames.bind(styles);

//component for the full text view of a single post and comments
const SinglePostView = ({match}) => {
    const {post} = useLocation();

    if (post === undefined) {
        return null;
    }
    const isAuthenticated = AuthService.getUser() !== undefined ? true : false;
    const link = isAuthenticated ? "/personal" : "/";
    return (
        <div key={post.id}>
            <div className="container-ld container-home pt-0" style={{padding:'0 28%'}}>
                <Card className="bg-opacity-50 p-4" style={{backgroundColor : '#db697d96'}}>
                    <FormGroup className="button-group" style={{textAlign:'left'}}>
                        <Button className="btn bg-opacity-25 mb-2 pt-1 pb-1"
                                href={link}
                        >
                            <span>Back</span>
                        </Button>
                    </FormGroup>
                    <Card className="bg-opacity-50 mb-3" style={{backgroundColor : '#db697d96'}}>
                        <div className={cx('single-post')} >
                            <Fragment>
                                <div className={cx("single-post-header")}>
                                    <h2 className={cx("single-post-title")}>
                                        {post.title}
                                    </h2>
                                    <div className={cx("single-post-meta")}>
                                        Posted by {post.author} on
                                        <span> {`  `} </span>
                                        {post.createDate}
                                    </div>
                                    <hr />
                                </div>
                                <p className={cx('single-post-body')}>{post.body}</p>
                            </Fragment>
                        </div>
                    </Card>
                    <CommentForm postId = {post.id}/>

                </Card>

            </div>
        </div>

    )
};


export default SinglePostView;