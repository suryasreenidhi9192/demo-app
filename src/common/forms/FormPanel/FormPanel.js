import React from 'react'
import PropTypes from 'prop-types'

import './FormPanel.scss'

/**
 * @public
 * A component to create Form Panel for layout purposes.
 * Alternate section heading legend
 * @param {Node}      params.children   React Component or string to render in the FormPanel
 * @param {String}      params.legend   String or Object to be rendered as Legend
*/

const FormPanel = ({
    legend = '',
    children
}) => {

    const classList = ['form-panel']
    if (legend) classList.push('with-legend')
    const cls = classList.join(' ')

    return (
        <section className={ cls }>
            { !!legend && <legend>{ legend }</legend> }
            { children }
        </section>
    )

}

FormPanel.propTypes = {
    /** React Component or string to render in the FormPanel */
    children: PropTypes.node,
    /** String or Object to be rendered as Legend */
    legend: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
    /** Heading of Form Section */
}

export default FormPanel
