import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post-actions'
import { unCommentPost } from '../../actions/post-actions'
import Preloader from '../layout/Preloader'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'


function PostComments({ postId, comments, auth, unCommentPost }) {


    return (
        <Fragment>

            <div class="comments">
                {comments.length > 0 ? comments.map(comment => (<div class="post bg-white p-1 my-1">

                    <div>
                        <a href={`/profile/${comment.user}`}>
                            <img
                                class="round-img"
                                src={comment.avatar}
                                alt=""
                            />
                            <h4> {comment.name}</h4>
                        </a>
                    </div>
                    <div>
                        <p class="my-1">
                            {comment.text}
                        </p>
                        <p class="post-date">
                            posted on <Moment format='YYYY/MM/DD'>{comment.date}</Moment>
                        </p>
                        {auth.isAuthenticated && !auth.loading && comment.user === auth.user._id && (<button
                            type="button"
                            class="btn btn-danger"
                            onClick={(e) => unCommentPost(postId, comment._id)}>
                            <i class="fas fa-times"></i>
                            
                        </button>)}
                        
                    </div>
                </div>
                )) : <h4>No comments yet</h4>}

            </div>
        </Fragment>
    )
}






const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { getPost, unCommentPost })(PostComments)
