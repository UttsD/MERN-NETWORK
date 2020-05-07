import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post-actions'
import  PostItem  from './PostItem'
import Preloader from '../layout/Preloader'


function Posts({ getPosts, post: { posts, loading } }) {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            <h1 class="large text-primary">Posts</h1>
            <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>

            <div class="post-form">
                <div class="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form class="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        required
                    ></textarea>
                    <input type="submit" class="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
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

