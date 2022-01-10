import React, { Fragment } from 'react';
import styles from './postpreview.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


const PostPreview = ({ post }) => {
    if (post === undefined) {
        return null;
    }
    let postBody = post.body;
    if (postBody.length > 20) {
        postBody = postBody.substring(0, 20) + '...';
    }

    return (
        <div key={post.id}  style={{backgroundColor: 'lightpink'}}>
            <div className={cx('post')} >
                <Fragment>
                    <div className={cx("post-header")}>
                        <h2 className={cx("post-title")}>
                            {post.title}
                        </h2>
                        <div className={cx("post-meta")}>
                            Posted by {post.author} on
                            <span> {`  `} </span>
                            {post.createDate}
                        </div>
                        <hr />
                    </div>
                    <p className={cx('post-body')}>{postBody}</p>
                </Fragment>
            </div>
        </div>
    )
};

export default PostPreview;