import React from 'react'
import PropTypes from 'prop-types'

import { SvgCaret, SvgNotificationErrorLight } from '../../../icons'

import './ReduxSelect.scss'


/**
 * @public
 * Creates a Input field that can toggle between a Password and Text types to "show" tha password
 * @param    {Array}                 props.options      An array of objects representing the options and their values
                                                        `value` is used for the form value here and `label` is used for the visible
                                                        option copy
 * @param    {String}                props.label        Label text to display above the Radio Group
 * @param    {Boolean}               props.disabled     A toggle to enable and disable the select
 * @param    {String|Boolean}        props.meta         Redux Forms data about the state of the field
 * @param    {String|Function}       props.input        Redux-forms input Entity
*/

const ReduxSelect = (props) => {

    const { input, label, options, disabled, meta: { touched, error } = {} } = props
    const err = (touched && error)
    const errClass = (err) ? ' err' : ''
    const cls = `select ${errClass}`

    const extraProps = {}
    if (!!disabled) extraProps.disabled = 'disabled'

    return (

        <div className={ cls }>

            <label>

                <div className="description">
                    { label }
                </div>

                <select { ...input } {...extraProps}>
                    { options.map(
                        (o) =>
                            <option value={ o.value } key={ o.value }>
                                { o.label }
                            </option>
                    )
                    }
                </select>

                <SvgCaret className="select-caret-icon" />

                { err && <SvgNotificationErrorLight className="select-error-icon" /> }

            </label>

            { err && <div className="message">{ error }</div> }

        </div>

    )

}

ReduxSelect.propTypes = {
    /** A toggle to enable and disable the select */
    disabled: PropTypes.bool,
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
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string
    }),
    /** An array of objects representing the options and their values
    `value` is used for the form value here and `label` is used for the visible
    option copy */
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    }))
};

export default ReduxSelect
