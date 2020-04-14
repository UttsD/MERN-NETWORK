import {GET_PROFILE, GET_PROFILES, PROFILE_ERROR, GET_GH_REPOS, UPDATE_PROFILE, DELETE_ACCOUNT, CLEAR_PROFILE} from './types';
import axios from 'axios';
import {setAlert} from './alert-actions'


//Get curren user profile
export const getCurrentProfile = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get all profiles
export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }}
// Get profile by ID
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get github repos 
export const getGithubRepos = (githubUser) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${githubUser}`);

        dispatch({
            type: GET_GH_REPOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Create Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const  config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit){
            history.push('/dashboard');
        }
        } catch (err) {
    
         const errors = err.response.data.errors;

         if(errors){
            
             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
         }
         dispatch({
             type: PROFILE_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
         })
    }
}

//Add expirience
export const addExperience = (formData, history) => async dispatch => {
    
    try {
        const  config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience added', 'success'))

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

         if(errors){
            
             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
         }
         dispatch({
             type: PROFILE_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
         })
    }

   
}
//Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const  config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education added', 'success'))

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

         if(errors){
            
             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
         }
         dispatch({
             type: PROFILE_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
         })
    }

}

//Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience deleted', 'danger'));
    } catch (err) {
        const errors = err.response.data.errors;

         if(errors){
            
             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
         }
         dispatch({
             type: PROFILE_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
         })
    }
}
//Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education deleted', 'danger'));
    } catch (err) {
        const errors = err.response.data.errors;

         if(errors){
            
             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
         }
         dispatch({  
             type: PROFILE_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
         })
    }
}

//Delete account
export const deleteAccount = () => async dispatch => {
    
    if(window.confirm('Are you sure?')){
    try {
        await axios.delete('api/profile');
        dispatch({type: CLEAR_PROFILE})
        dispatch({
            type: DELETE_ACCOUNT
            
        })
        dispatch(setAlert('Account deleted', 'danger'));
    } catch (err) {
        const errors = err.response.data.errors;

         if(errors){
            
             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
         }
         dispatch({
             type: PROFILE_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
         })
    }
}
}