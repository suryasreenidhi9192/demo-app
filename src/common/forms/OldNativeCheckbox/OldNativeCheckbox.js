import React from 'react'
import PropTypes from 'prop-types'

import './OldNativeCheckbox.scss'

/**
 * @public
 * A component for form field layout.
 * @param {String}          params.label        To display label for checkbox
 * @param {Boolean}         params.disabled     Flag to disable the field
*/

const OldNativeCheckbox = ({
    label,
    disabled,
    ...rest
}) => {

    const cls = 'old-native-checkbox'

    const extraProps = rest
    if (!!disabled) extraProps.disabled = 'disabled'

    return (

        <div className={ cls }>

            <label>
                <input type="checkbox" {...extraProps} />
                <span className="checkmark" />
                <div className="description">
                    { label }
                </div>
            </label>

        </div>

    )

}

OldNativeCheckbox.propTypes = {
    /** To display label for checkbox */
    label: PropTypes.string,
    /**  Flag to disable the field */
    disabled: PropTypes.bool
}

export default OldNativeCheckbox
