import React, { Fragment } from 'react';
import styles from './comment.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


const Comment= ({ comment }) => {
    if (comment === undefined) {
        return null;
    }
    return (
        <div key={comment.id}  style={{backgroundColor: '#e8e8d6ed'}}>
            <div className={cx('comment')} >
                <Fragment>
                    <div className={cx("comment-meta")}>
                        Posted by {comment.username} on
                        <span> {`  `} </span>
                        {comment.create_date}
                    </div>
                    <hr className={cx('hr')}/>
                    <p className={cx('comment-body')}>{comment.body}</p>
                </Fragment>
            </div>
        </div>
    )
};

export default Comment;