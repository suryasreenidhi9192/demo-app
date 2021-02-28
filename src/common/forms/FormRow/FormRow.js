import React, { Children } from 'react'
import PropTypes from 'prop-types'

import { FormField } from '../../index'

import './FormRow.scss'

/**
 * @public
 * A component for form field layout.
 * @param {Node}        params.children     React Component or string to render
 * @param {String}      params.col          Number of columns withi a row
*/

const FormRow = ({ children, col = 1 }) => {

    const cnt = col - Children.count(children)
    const arr = []

    for (let i = 0; i < cnt; i++) {
        arr.push('')
    }

    return (
        <div className="form-row">
            { children }
            { arr.map((o, i) => <FormField type="" key={i} />) }
        </div>
    )

}

FormRow.propTypes = {
    /** React Component or string to render  */
    children: PropTypes.node,
    /** Number of columns within a row */
    col: PropTypes.string
}

export default FormRow
