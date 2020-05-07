import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile-actions'
import Preloader from '../layout/Preloader'

 const ProfileGithubRepos = ({githubuser, getGithubRepos, repos }) => {
    useEffect(() => {
        getGithubRepos(githubuser);
    }, [getGithubRepos]);
    
    return (
        <Fragment>
             <div class="profile-github">
          <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2>
          {repos === null?( <Preloader/>): 
          (repos.map(repo => (
            <div class="repo bg-white p-1 my-1">
            <div>
              <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
              {repo.description}
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                <li class="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
          ))
          )}
        </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    repos: state.profile.repos,
    auth: state.auth
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithubRepos)