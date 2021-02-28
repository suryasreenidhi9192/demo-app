import React from 'react'
import PropTypes from 'prop-types'

import './OldNativeRadioButtons.scss'

/**
 * @public
 * A component for form field layout.
 * @param {Array|String|Node}   params.options      Array of option to be displayed for this component
 * @param {Node}                params.selected     Key which has to be selected by default
 * @param {Boolean}             params.disabled     Toggle to disable/enable radio button
*/

const OldNativeRadioButtons = ({
    options,
    selected,
    disabled,
    ...rest
}) => {

    const cls = 'old-native-radio-buttons'

    const extraProps = rest
    if (!!disabled) extraProps.disabled = 'disabled'

    return (

        <ul className={ cls }>

            { options.map((o, i) => {

                const label = !o.label ? o.value : o.label
                const checked = (selected === o.value)
                const selProp = (!!checked) ? { defaultChecked: checked } : {}

                return (
                    <li className="native-radio" key={ i }>
                        <label>
                            <input
                                type="radio"
                                name={ o.key }
                                value={ o.value }
                                { ...extraProps }
                                { ...selProp }
                            />
                            <span className="radio-label">
                                { label }
                            </span>
                        </label>
                    </li>
                )

            })}

        </ul>

    )

}

OldNativeRadioButtons.propTypes = {
    /** Array of option to be displayed for this component */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /** Key of the option, which has to be unique */
            key: PropTypes.string,
            /** Value of the option */
            value: PropTypes.node,
            /** Lable of the option */
            label: PropTypes.node
        })
    ),
    /** Key which has to be selected by default */
    selected: PropTypes.node,
    /** Toggle to disable/enable radio button */
    disabled: PropTypes.bool
}
export default OldNativeRadioButtons
