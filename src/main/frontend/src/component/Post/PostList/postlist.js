import React, {Component, Fragment} from 'react';
import PostService from "../../../service/post-service";
import Pagination from "../../Pagination/pagination";
import AuthService from "../../../service/auth-service";


export default class PostList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            userId : "",
            success : false,
            posts: [],
            message: ""
        };
    };

    responseHandler = response => {
        const result = JSON.parse(JSON.stringify(response));
        this.setState({
            posts: result,
            message: response.toString(),
            successful: true,
        });
    };

    errorHandler = error => {
        const errormessage = ((error.response && error.response.data.toString()) || error.toString());
        this.setState({
            message: errormessage,
            successful: false
        });
    };


     async componentDidMount() {
        if (this.props.personal){ // load personal posts
            const userId = AuthService.getUser().id.toString();
            await PostService.getPostsByUser(userId).then(
                response => this.responseHandler(response),
                error => this.errorHandler(error)
            )
        }else{ //load all public posts
            PostService.getAllPosts().then(
                response => this.responseHandler(response),
                error => this.errorHandler(error)
            )
        }
    }

    render() {
         const {home} = this.props;
        return (
            <div>
                {this.state.message && !this.state.successful && (
                    <div className={"alert alert-danger"} role="alert">
                        {this.state.message}
                    </div>
                )}
                {this.state.successful && (
                    <>
                        <Pagination
                            data={this.state.posts}
                            pageLimit={1}
                            dataLimit={home === true ? 2 : 3 }
                            isPost = {true}
                        />
                    </>

                )}
            </div>
        );
    }

}



