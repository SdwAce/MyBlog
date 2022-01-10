import React, {Component} from "react";
import PostList from "../Post/PostList/postlist";
import PersonalHeader from "../Header/personal-header";
import {Tab, Tabs} from "react-bootstrap";
import AddPost from "../Post/AddPost/addpost";
import AuthService from "../../service/auth-service";

export default class Personal extends Component {
    render() {
        const username = AuthService.getUser().username.toString();
        return (
            <div>
                <PersonalHeader username={username}/>
                <div className="container-ld container-home pt-0" style={{padding:'0 18%'}}>
                    <Tabs defaultActiveKey="home" className="bg-light bg-opacity-50 btn-group-toggle">
                        <span className="navbar-brand mb-0 h4">Your personal blog space</span>
                            <Tab eventKey="home" title="Personal Posts">
                                <div className="row">
                                    <PostList personal={true} home = {false}/>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Public Posts">
                                <div className="row">
                                    <PostList personal={false} home = {false}/>
                                </div>
                            </Tab>
                            <Tab eventKey="contact" title="New Post">
                                <AddPost />
                            </Tab>

                    </Tabs>

                </div>

            </div>
        );
    }
}