import React from 'react'
import PropTypes from 'prop-types'

import './ReduxTextArea.scss'


/**
 * @public
 * Creates a Input field that can toggle between a Password and Text types to "show" tha password
 * @param    {String}                props.label        Label text to display above the Radio Group
 * @param    {Boolean}               props.disabled     A toggle to enable and disable the Text Area
 * @param    {String|Boolean}        props.meta         Redux Forms data about the state of the field
 * @param    {String|Function}       props.input        Redux-forms input Entity
*/

const ReduxTextArea = (props) => {

    const {
        input,
        label,
        disabled,
        meta: { touched, error } = {},
        ...rest
    } = props

    const err = (touched && error)
    const errClass = (err) ? ' err' : ''
    const cls = `textarea ${errClass}`

    const extraProps = { ...rest }
    if (!!disabled) extraProps.disabled = 'disabled'

    return (

        <div className={ cls }>

            <label>
                <div className="description">
                    { label }
                </div>
                <textarea type="text" {...input} {...extraProps} />
            </label>

            { err && <div className="message">{ error }</div> }

        </div>

    )

}

ReduxTextArea.propTypes = {
    /** A toggle to enable and disable the Text Area */
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
    })
}

export default ReduxTextArea
