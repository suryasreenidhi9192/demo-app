import React from 'react'
import PropTypes from 'prop-types'

import './ReduxFormLookup.scss'

/**
 * OK - this needs to be restructured
 *
 * This component should be a child component of Input, not a property fron Input so we can pass Persist
 * and Type of "icon" or "link".
 * That is so we can determine whether or not we want the content inside the hint
 * to dismiss the dialog or not.
 *
 * For now just default persist to false and everything will dismiss the hint
 *
 * */

/**
 * @public
 * Creates a ReduxForms compatable checkbox input type
 * @param   {Node}     props.link   React Component or string to render in the ReduxFormLookup
*/

const ReduxFormLookup = ({
    link
}) => {

    return (

        <li className="redux-form-lookup">

            { link &&
                <div className="form-lookup-link">{ link }</div>
            }

        </li>

    )

}

ReduxFormLookup.propTypes = {
    /** React Component or string to render in the ReduxFormLookup */
    link: PropTypes.node
}

export default ReduxFormLookup
