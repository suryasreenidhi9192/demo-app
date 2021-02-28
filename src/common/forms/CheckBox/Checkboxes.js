import React from 'react'
import PropTypes from 'prop-types'

import './Checkbox.scss'

/**
 * @public
 * Builds Checkbox Container to hold group of checkboxes, 
 from which the user may check or uncheck to complete their task.
 * @param {Node}        params.children     React Component or string to render in the checkboxes
 * @param {String}      params.cls          styles class for customization
 * @param {String}      params.id           Id to keep the childrens unique
*/

const Checkboxes = ({
    children = [],
    cls = '',
    id = ''
}) => {

    const className = 'checkboxes ' + cls
    /** 4 empties seems safe even for desktop */
    const qty = children.length > 2 ? 4 : 0
    const arr = []
    for (let i = 0; i < qty; i++) {
        arr.push('')
    }

    return (

        <div id={ id } className={ className } >

            { children }
            {
                arr.map((e, i) => (
                    <div className="empty-checkbox" key={ i } />
                ))
            }

        </div>

    )

}

Checkboxes.propTypes = {
    /** React Component or array to render in the checkboxes */
    children: PropTypes.node,
    /** styles class for customization */
    cls: PropTypes.string,
    /** Id to keep the childrens unique */
    id: PropTypes.string
}

export default Checkboxes
