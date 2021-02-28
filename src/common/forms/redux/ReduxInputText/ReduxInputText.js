import React from 'react'
import PropTypes from 'prop-types'

import { SvgNotificationErrorLight } from '../../../icons'
import { ReduxFormHint, ReduxFormLookup } from '../../index'

import './ReduxInputText.scss'


/**
 * @public
 * Creates a Input field that can toggle between a Password and Text types to "show" tha password
 * @param    {Node}                  props.formLookupLink       passed as a props to ReduxFormLookup component to render a Lookup Link
 * @param    {Node}                  props.hintLink             passed as a props to ReduxFormHint component to render link for hint
 * @param    {Node}                  props.hint                 passed as a props to ReduxFormHint component to render a hint
 * @param    {Node}                  props.label                string or JSX to use as a label
 * @param    {Boolean}               props.disabled             Flag to disable the field
 * @param    {Boolean}               props.required             flag to render required nodes
 * @param    {String|Boolean}        props.meta                 Redux Forms data about the state of the field
 * @param    {String|Node|Object}    props.input                Redux Forms passed virtual input object
*/

const ReduxInputText = (props) => {

    const {
        input,
        label,
        required,
        hint,
        hintLink,
        disabled,
        formLookupLink,
        meta: { touched, error } = {},
        ...rest
    } = props

    const err = (touched && error)
    const errClass = (err) ? ' err' : ''
    const cls = `input-text ${errClass}`

    const extraProps = { ...rest }
    if (!!disabled) extraProps.disabled = 'disabled'

    return (

        <div className={ cls }>

            <label>

                <ul className="label-row">
                    <li className="description">{ label }</li>
                    { hint && <ReduxFormHint hint={ hint } hintLink={ hintLink } /> }
                    { formLookupLink && <ReduxFormLookup link={ formLookupLink } /> }
                </ul>

                <input type="text" {...input} {...extraProps} />

                { err && <SvgNotificationErrorLight className="input-error-icon" /> }

            </label>

            { err && <div className="message">{ error }</div> }

        </div>

    )

}

ReduxInputText.propTypes = {
    /* Redux Forms passed virtual input object */
    input: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.node,
        PropTypes.string
    ]),
    /** string or JSX to use as a label */
    label: PropTypes.node,
    /** flag to render required nodes */
    required: PropTypes.bool,
    /** passed as a props to ReduxFormHint component to render a hint */
    hint: PropTypes.node,
    /** passed as a props to ReduxFormHint component to render link for hint */
    hintLink: PropTypes.node,
    /**  Flag to disable the field */
    disabled: PropTypes.bool,
    /** passed as a props to ReduxFormLookup component to render a Lookup Link */
    formLookupLink: PropTypes.node,
    /** Redux Forms data about the state of the field */
    meta: PropTypes.oneOfType([
        PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        })
    ])
}

export default ReduxInputText
