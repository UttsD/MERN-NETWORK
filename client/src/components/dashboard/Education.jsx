import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import {deleteEducation} from '../../actions/profile-actions'

const Education = ({education, deleteEducation}) => {
    const educations = education.map(ed => {
        return( <tr key={ed.id}>
    
        <td>{ed.school}</td>
        <td className='hide-sm'>{ed.fieldofstudy }</td>
        <td><Moment format='YYYY/MM/DD'>{ed.from}</Moment> - {
            ed.to === null ? (' Now') : <Moment format='YYYY/MM/DD'>{ed.to}</Moment>
        } </td>
        <td>
            <button className='btn btn-danger' onClick = {() => deleteEducation(ed._id)}>Delete</button>
        </td>
        </tr>
        
        )
        })
        return (
            <Fragment>
                <h1 className='my-2'>Education credentials</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                School
                           </th>
                            <th className='hide-sm'>Field of study</th>
                            <th className='hide-sm'>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{educations}</tbody>
                    <tr>
    
                    </tr>
    
                </table>
            </Fragment>
        )
}

export default connect(null, {deleteEducation})(Education)
