import React, {Fragment, useEffect} from 'react'
import Preloader from '../layout/Preloader'
import {getProfiles} from '../../actions/profile-actions'
import {connect} from 'react-redux'
import ProfileItem from './ProfileItem'


const Profiles = ({getProfiles, profile: {profiles, loading}}) => {

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {loading? <Preloader /> : 
            <Fragment>
                <h1 className="large text-primary">
                    Developers
                </h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Brouse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    ) : 
                    <h4>no Profiles found</h4>}
                </div>
            </Fragment>
            
            }
        </Fragment>
    )
}


const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)