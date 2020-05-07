import React, { Fragment } from 'react'
import Moment from 'react-moment'

export const ProfileEducation = ({education}) => {
    return (
    <Fragment>
          {education.map(edu => {
                return (
          <div>
            <h3>{edu.school}</h3>
            <p><Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {
                            edu.to === null ? (' Now') : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}</p>
            <p><strong>Degree: </strong>{edu.degree}</p>
            <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{edu.description}
            </p>
          </div>)
          })}
        
        </Fragment>
    )
}


