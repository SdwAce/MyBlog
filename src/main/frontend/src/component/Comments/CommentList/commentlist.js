import React from "react";
import styles from './commentlist.css';
import classNames from 'classnames/bind';
import Pagination from "../../Pagination/pagination";
const cx = classNames.bind(styles);

//component for comment lists
const CommentList = ({comments}) => {

    return (
        <div className={cx("comment-list")}>
            <h5 className="text-muted mb-4">
                <span className="badge bg-opacity-75" style={{backgroundColor : '#6c2d97b5'}}>{comments.length} </span> {" "}
                <span className="text-body"> Comment{comments.length > 0 ? "s" : ""} </span>
            </h5>

            {/*{comments.length > 0 && comments.map((comment, index) => (*/}
            {/*    <Comment key={index} comment={comment} />*/}
            {/*))}*/}
            {comments.length > 0 && (
                <Pagination
                    data={comments}
                    pageLimit={1}
                    dataLimit={5}
                    isPost = {false}
                />)
            }


        </div>
    );
}

export default CommentList;