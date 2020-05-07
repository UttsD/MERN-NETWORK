import React, { Fragment, useEffect } from 'react'
import Preloader from '../layout/Preloader'
import { ProfileTop } from './ProfileTop'
import { ProfileAbout } from './ProfileAbout'
import { ProfileEducation } from './ProfileEducation'
import { ProfileExperience } from './ProfileExperience'
import  ProfileGithubRepos  from './ProfileGithubRepos'
import { getProfileById } from '../../actions/profile-actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);

    return (
        <Fragment>
            {profile === null || loading ? <Preloader /> :
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                        (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
                </Fragment>

            }
            <div class="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div class="profile-edu bg-white p-2">

          <h2 class="text-primary">Education</h2>
                {profile.education.length > 0 ? <ProfileEducation education={profile.education} /> : (<h4>No education</h4>)}</div>
                <div class="profile-exp bg-white p-2">
                    <h2 class="text-primary">Experience</h2>
                    {profile.experience.length > 0 ? <ProfileExperience experience={profile.experience} /> : (<h4>No experience</h4>)}</div>
            </div>
            {profile.githubuser && <ProfileGithubRepos githubuser = {profile.githubuser}/>}
        </Fragment>
    )
}


const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)