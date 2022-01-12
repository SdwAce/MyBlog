import React, {Component} from 'react';
import PostList from "../Post/PostList/postlist";
import { Card} from "react-bootstrap";

//component for home page
export default class Home extends Component{

    render() {
        return (
            <div>
                <div className="row d-flex justify-content-center align-items-center h-100" style={{paddingTop:'3%', margin : '0 10%'}}>
                    <div className="col-xl-11">
                        <Card className= "rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-12 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 loginText">
                                        <h4 className="mb-4 text-center">Welcome to use MyBlog</h4>
                                        <p className="medium mb-0 text-center">We are aiming to share your stories to the world.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="row d-flex justify-content-center align-items-center h-100" style={{ paddingBottom:'5%', margin : '0 10%'}}>
                    <div className="col-xl-11">
                        <Card className= "rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-4 d-flex align-items-center gradient-custom-1 ">
                                    <div className=" px-3 py-4 loginText">
                                        <h5 className="text-white mb-0">Here are the latest stories publish by our users</h5>
                                        <h5 className="text-white mb-0">all over the world !</h5>
                                    </div>
                                </div>
                                <div className="col-lg-8 d-flex align-items-center gradient-custom-1">
                                    <div className={"w-100 mt-5 px-3"}>
                                        <PostList personal={false} home = {true} />
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </div>
                </div>

            </div>



        );
    }
}
