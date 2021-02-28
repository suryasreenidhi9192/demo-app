import React from 'react'
import PropTypes from 'prop-types'

/**
 * @public
 * A component to create Form Tag
 * @param {Node}      params.children   React Component or string to render in Form 
*/

const Form = ({
    children,
    dark,
    ...rest
}) => {

    const cls = dark ? 'form dark-theme' : 'form'

    return (

        <form {...rest} className={ cls }>
            { children }
        </form>

    )

}

Form.propTypes = {
    /** React Component or string to render in Form */
    children: PropTypes.node
}

export default Form
