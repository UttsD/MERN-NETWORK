import {
    GET_POSTS,
    GET_POST,
    UPDATE_LIKES,
    POST_ERROR,
    DELETE_POST,
    ADD_POST,
    COMMENT_POST,
    REMOVE_COMMENT_POST
} from '../actions/types';

import axios from 'axios';
import {setAlert} from './alert-actions'

// GET POSTS
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}
// Add POSTS
export const addPost = formData => async dispatch => {
    const  config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}
// Add Comment 
export const commentPost = (id, formData) => async dispatch => {
    debugger;
    const  config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/posts/comments/${id}`, formData, config);

        dispatch({
            type: COMMENT_POST,
            payload: {id, comments: res.data.comments}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}
// Remove Comment 
export const unCommentPost = (postId, commentId) => async dispatch => {
    debugger
    try {
         await axios.delete(`/api/posts/comments/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT_POST,
            payload: commentId
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}
// Add Like
export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data.likes}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}
// Get Post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}
// Delete Like
export const deleteLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data.likes}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}
// Delete Post
export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}