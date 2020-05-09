import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentPost } from '../../actions/post-actions'
import Preloader from '../layout/Preloader'
import { Link } from 'react-router-dom'


function PostCommentForm({post, commentPost}) {
    const[text, setText] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        commentPost(post._id, {text});
        setText('');
     }
    return (
        <Fragment>
           
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit = {e => {onSubmit(e)}}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value = {text}
            onChange = {e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

        </Fragment>
    )}
            
       
    



    export default connect(null, { commentPost })(PostCommentForm)
