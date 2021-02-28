import React from 'react'
import PropTypes from 'prop-types'

import './ReduxInputStatic.scss'

/**
 * @public
 * Creates a spacer for static text mixed with form fields for layout purposes
 * @param  {String|Node} props.label    String or JSX to use as a label
 * @param  {String|Node} props.value    String or JSX to use as a value
 * @return {React}                      React Component
*/

const ReduxInputStatic = ({
    label,
    value,
    ...rest
}) => {

    const cls = 'input-static'

    return (

        <div className={ cls }>

            <label>

                <div className="description">
                    { label }
                </div>

                <div className="value" {...rest}>
                    { value }
                </div>

            </label>

        </div>

    )

}

ReduxInputStatic.propTypes = {
    /* String or JSX to use as a label */
    label: PropTypes.node,
    /* String or JSX to use as a value */
    value: PropTypes.node
}

export default ReduxInputStatic
