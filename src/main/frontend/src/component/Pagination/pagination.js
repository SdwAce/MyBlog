import React, {useEffect, useState} from 'react';
import {Card, ListGroup, ListGroupItem} from "reactstrap";
import PostPreview from "../Post/PostPreview/postpreview";
import {Alert} from "react-bootstrap";
import { Link } from 'react-router-dom'
import Comment from "../Comments/Comment/comment";

// component for anything that need pagination (comment list and post list)
function Pagination({ data, pageLimit, dataLimit, isPost}) {
    const [pages, setPages] = useState(Math.ceil(data.length / dataLimit));
    useEffect(() => {
        setPages(() => Math.ceil(data.length / dataLimit));
    });

    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };


    return (
        <div>
            {isPost && (
                <ListGroup className="mb-5" style={{backgroundColor:'rgba(146, 167, 187, 0.86)', minHeight: '20vh'}}>
                    {data.length === 0 && (
                        <Alert variant="success">
                            <Alert.Heading>Nice to meet you !</Alert.Heading>
                            <p>
                                Currently there is no posts yet.
                                Start sharing your stories!
                            </p>
                        </Alert>
                    )}

                    {data.length > 0 && (
                        <div style={{width: '60%'}}>
                            {getPaginatedData().map(singlePost => (
                                <div>
                                    {/* direct to a single post view*/}
                                    <Link to={{pathname: "/posts/" + singlePost.id, post:singlePost}} className="list-group-item" style={{backgroundColor: '#aa7d9d',borderBlockColor: 'rgba(53, 105, 90, 0.57)'}}>
                                        <Card style={{backgroundColor: 'darkgreen'}}>
                                            <PostPreview post={singlePost}/>
                                        </Card>
                                    </Link>
                                </div>
                            ))}

                            <ListGroupItem className="pagination m-0">
                                {/* previous button */}
                                <button
                                    onClick={goToPreviousPage}
                                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                                >
                                    prev
                                </button>

                                {/* show page numbers */}
                                {getPaginationGroup().map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={changePage}
                                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                                    >
                                        <span>{item}</span>
                                    </button>
                                ))}

                                {/* next button */}
                                <button
                                    onClick={goToNextPage}
                                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                                >
                                    next
                                </button>
                            </ListGroupItem>
                        </div>
                    )}
                </ListGroup>
            )}
            {!isPost && (
                <div>
                    {data.length > 0 && (
                        <div>
                            {getPaginatedData().map(singleComment => (
                                <Comment comment={singleComment} /> ))}

                            <ListGroupItem className="pagination">
                                <button
                                onClick={goToPreviousPage}
                                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                                >
                                prev
                                </button>

                                {getPaginationGroup().map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={changePage}
                                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                                    >
                                    <span>{item}</span>
                                    </button>
                                ))}

                                <button
                                    onClick={goToNextPage}
                                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                                >
                                 next
                               </button>
                            </ListGroupItem>
                        </div>
                      )
                    }
                </div>
            )
            }
        </div>
    );
}

export default Pagination;