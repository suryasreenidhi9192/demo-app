import React from 'react'
import PropTypes from 'prop-types'

import './ReduxRadioGroup.scss'

// TODO: Make this work as a regular form radio group (make reduxForms optional)

/**
 * @public
 * Creates a radio button group (in a column by default)
 * @param  {React Component}    params.input          Redux Form compatible Input Interface
 * @param  {String}             params.label          String for Label of overall group
 * @param  {Array}              params.options        Array of objects used to generate radio buttons
 * @param  {Boolean}            params.disabled       flag to toggle enabling all radio buttons
 * @param  {Boolean}            params.inline         Flag to toggle layout of radio group in a row
 * @param  {Object}             params.meta:          Redux Forms dirty/errored object
 * @param  {String}             className             CSS classname applied to the radio-group
 * @return {React Component}
*/

const ReduxRadioGroup = ({
    input = {},
    label,
    name,
    // value: propValue,
    options,
    disabled: disableFlagged,
    inline,
    invalid,
    meta: { touched, error } = {},
    className = ''
}) => {
    const defaultOption = options.filter(opt => (opt.default))[0]
    const defaultValue = defaultOption && defaultOption.key
    const selectedValue = input.value || defaultValue
    const errClass = (touched && error) || invalid ? 'err' : ''
    const inlineClass = (!!inline) ? 'radio-inline' : ''
    const disabled = (!!disableFlagged) ? 'disabled' : null
    const localInput = {
        name,
        value: selectedValue,
        ...input
    }

    return (
        <div className={`radio ${errClass}`}>
            { label &&
                <label>
                    <div className="description">
                        { label }
                    </div>
                </label>
            }
            <div className={ className }>
                <div className={ `radio-group ${inlineClass}` }>
                    { options.map(({ value, label }, iterator) => {
                        const defaultChecked = !disabled && value === selectedValue
                        return (
                            <label
                                className={`radio ${className}`}
                                key={`${value}_${iterator}`}
                                htmlFor={ `${localInput.name}_${iterator}` }
                            >
                                <input
                                    { ...localInput }
                                    { ...{ disabled, defaultChecked } }
                                    className={ className }
                                    id={ `${localInput.name}_${iterator}` }
                                    type="radio"
                                    value={ value }
                                />
                                <span className="radio__label">
                                    { label }
                                </span>
                            </label>
                        )
                    })}
                </div>
                { errClass && <div className="message">{ error }</div> }
            </div>
        </div>
    )
}

ReduxRadioGroup.propTypes = {
    /** React CSS class to put on the Radio Group */
    className: PropTypes.string,
    /** A toggle to enable and disable the radio group */
    disabled: PropTypes.bool,
    /** A toggle to display the group horizontally instead of vertically */
    inline: PropTypes.bool,
    /** Redux-forms input Entity */
    input: PropTypes.shape({
        className: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string
    }),
    /** Label text to display above the Radio Group */
    label: PropTypes.string,
    /** Redux Forms data about the state of the field */
    meta: PropTypes.oneOfType([
        PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        })
    ]),
    /** An array of objects representing the radio button labels and values
    `value` is used for the form value here and `label` is used for the visible
    label in following the setup of the select component */
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    }))
};

export default ReduxRadioGroup;
