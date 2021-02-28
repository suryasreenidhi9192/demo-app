import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SvgNotificationErrorLight } from '../../../icons'

import './ReduxInputPassword.scss'

/**
 * @public
 * Creates a Input field that can toggle between a Password and Text types to "show" tha password
 * @param    {Node}                  props.label        String or JSX to use as a label
 * @param    {Boolean}               props.disabled     Flag to disable the field
 * @param    {String|Boolean}        props.meta         Redux Forms data about the state of the field
 * @param    {String|Node|Object}    props.input        Redux Forms passed virtual input object
*/
class ReduxInputPassword extends Component {

    constructor(props) {

        super(props)

        this.state = {
            hide: false,
            focused: false
        }

        if (props.rules) this.startValidation = this.startFocus.bind(this)

    }

    startFocus() {
        this.setState({ focused: true })
    }

    render() {

        const { focused, hide } = this.state

        const showHide = () => {
            this.setState({ hide: !hide })
        }

        const toggleText = (hide) ? 'hide' : 'show'
        const inputType = (hide) ? 'text' : 'password'

        const { input, label, disabled, meta: { touched, error } = {}, ...rest } = this.props

        const err = ((touched || focused) && error)
        const errClass = (err) ? ' err' : ''
        const cls = `input-password ${errClass}`

        const extraProps = { ...rest }
        if (!!disabled) extraProps.disabled = 'disabled'

        return (

            <div className={ cls }>

                <label>

                    <div className="description">
                        { label }
                    </div>

                    <input
                        type={ inputType }
                        {...input}
                        {...extraProps}
                        autoCorrect="off"
                        spellCheck="false"
                        autoComplete="off"
                        onFocus={ this.startValidation }
                    />

                    <div className="password-show-hide" onClick={ showHide }>
                        { toggleText }
                    </div>

                    { err && <SvgNotificationErrorLight className="input-password-error-icon" /> }

                </label>

                { err && <div className="message">{ error }</div> }

            </div>

        )
    }

}

ReduxInputPassword.propTypes = {
    /* Redux Forms passed virtual input object */
    input: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.node,
        PropTypes.string
    ]),
    /* String or JSX to use as a label */
    label: PropTypes.node,
    /**  Flag to disable the field */
    disabled: PropTypes.bool,
    /** Redux Forms data about the state of the field */
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string
    })

}

export default ReduxInputPassword
