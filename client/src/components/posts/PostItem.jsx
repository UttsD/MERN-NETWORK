import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {addLike, deleteLike, deletePost} from '../../actions/post-actions';


function PostItem({auth, singlePost, addLike, deleteLike, deletePost, post: {
    _id,
    text,
    name,
    user,
    avatar,
    date,
    likes,
    comments
}}) {
    return (
        
        <div class="post bg-white p-1 my-1">
            <div>
                <a href="profile.html">
                    <img
                        class="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4><Link to={`/profile/${user}`} >{name}</Link></h4>
                </a>
            </div>
            <div>

                <p class="my-1">{text}</p>
                <p class="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>
                    {!singlePost && (<Fragment><button  type="button" class="btn btn-light" onClick = {e => addLike(_id)}>
                    <i class="fas fa-thumbs-up"></i>
                    <span> {likes.length}</span>
                </button>
                <button type="button" class="btn btn-light" onClick = {e => deleteLike(_id)}>
                    <i class="fas fa-thumbs-down"></i>
                </button>
                <Link to={`post/${_id}` }class="btn btn-primary">
                    Discussion <span class='comment-count'>{comments.length}</span>
                </Link>
                {auth.isAuthenticated && user === auth.user._id && auth.loading === false  &&
                    (<button
                        type="button"
                        class="btn btn-danger" onClick = {e => deletePost(_id)}
                    >
                        <i class="fas fa-times"></i>
                    </button>)}</Fragment>)}
                 
            </div>
        </div>
    )
}
PostItem.defaultProps = {
    singlePost: false
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addLike, deleteLike, deletePost})(PostItem);

