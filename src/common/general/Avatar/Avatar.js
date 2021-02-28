import React from 'react'
import PropTypes from 'prop-types'

import './Avatar.scss'

/**
 * @public
 * Builds an Avtar with first name and last name
 * @param {String}  params.firstName    First Name string to display as first name in the Avatar
 * @param {String}  params.lastName     Last Name string to display as last name in the Avatar
*/

const Avatar = ({ firstName, lastName }) => {

    const initials = [firstName, lastName].map(name => {
        if (!name) return ''
        return name.charAt(0).toUpperCase()
    }).join('') || '?'

    return (
        <div className="avatar">
            { initials }
        </div>
    )
}

Avatar.propTypes = {
    /** First Name string to display as first name in the Avatar */
    firstName: PropTypes.string,
    /** Last Name string to display as last name in the Avatar */
    lastName: PropTypes.string
}

export default Avatar
