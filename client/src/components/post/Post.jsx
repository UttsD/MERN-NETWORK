import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post-actions'
import  PostComments  from './PostComments'
import  PostItem  from '../posts/PostItem'
import PostCommentForm  from './PostCommentForm'
import Preloader from '../layout/Preloader'
import { Link } from 'react-router-dom'


function Post({ getPost, post: { post, loading },  match}) {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return post === null || loading ? (<Preloader />) :
        (<Fragment>
            <Link to="/posts" class="btn">Back To Posts</Link>
            <PostItem post={post} singlePost={true} />
        <PostCommentForm  post = {post} />
        <PostComments comments = {post.comments} postId = {post._id} /></Fragment>)
            
     
      };
            
            

    


const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)

