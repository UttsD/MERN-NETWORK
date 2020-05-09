import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post-actions'
import  PostItem  from './PostItem'
import  PostForm  from './PostForm'
import Preloader from '../layout/Preloader'


function Posts({ getPosts, post: { posts, loading } }) {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            <h1 class="large text-primary">Posts</h1>
            <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>
            <PostForm />
            
            {loading ? <Preloader /> :
                <Fragment>
                    <div class="posts">
                        {posts.map(post => (
                            <PostItem post = {post} key = {post._id}/>
                        ))}
                 
                </div>
            </Fragment>}
            
            
        </Fragment>
    )
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)

