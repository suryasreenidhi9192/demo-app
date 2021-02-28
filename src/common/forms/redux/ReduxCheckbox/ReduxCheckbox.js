import React from 'react'
import PropTypes from 'prop-types'

import './ReduxCheckbox.scss'

/**
 * @public
 * Creates a ReduxForms compatable checkbox input type
 * @param  {String|Node} props.input    Redux Forms passed virtual input object
 * @param  {String|Node} props.label    String or JSX to use as a label
 * @param  {Boolean}     props.disabled Flag to disable the field
 * @return {React}                      React Component
*/

const ReduxCheckbox = ({ input, label, disabled, ...rest }) => {

    const cls = 'redux-checkbox'

    const extraProps = rest
    if (!!disabled) extraProps.disabled = 'disabled'

    return (

        <div className={ cls }>

            <label>
                <div className="description">
                    { label }
                </div>
                <input type="checkbox" {...input} {...extraProps} />
                <span className="checkmark" />
            </label>

        </div>

    )

}

ReduxCheckbox.propTypes = {
    /**  Redux Forms passed virtual input object */
    input: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.node,
        PropTypes.string
    ]),
    /**  Flag to disable the field */
    disabled: PropTypes.bool,
    /**  String or JSX to use as a label */
    label: PropTypes.node
}


export default ReduxCheckbox
