import React, { Fragment } from 'react'
import Moment from 'react-moment'

export const ProfileExperience = ({ experience }) => {
    return (
        
        <Fragment>

            {experience.map(exp => {
                return (

                    <Fragment>
                        <h3 class="text-dark">{exp.company}</h3>
                        <p><Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                            exp.to === null ? (' Now') : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}</p>
                        <p><strong>Position: </strong>{exp.title}</p>
                        <p>
                            <strong>Description: </strong>{exp.description}
                        </p>
                        </Fragment>
            )
        })}
        </Fragment>

    )
}




