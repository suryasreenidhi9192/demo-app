import React from 'react'
import PropTypes from 'prop-types'

/**
 * @public
 * A component to create Fieldset for scoping purposes.
 * @param {Node}      params.children   React Component or string to render in the button/link
*/

const FieldSet = ({ children }) => (

    <fieldset className="form-fields">
        { children }
    </fieldset>

)


FieldSet.propTypes = {
    /** React Component or string to render in the button/link */
    children: PropTypes.node
}

export default FieldSet
