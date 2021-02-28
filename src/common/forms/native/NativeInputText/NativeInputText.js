import React, { useEffect, useState } from 'react'

// import { validation, masks } from 'utils'
import { SvgNotificationErrorLight } from '../../../icons'
import NativeFormLookup from '../NativeFormLookup'

import './NativeInputText.scss'

const NativeInputText = ({
    type = 'text',
    name,
    id,
    value = '',
    label,
    placeholder,
    mask,
    rule,
    customValidation,
    callback,
    required,
    formLookupLink,
    ...rest
}) => {

    const [error, setError] = useState(false)
    const [internalValue, setInternalValue] = useState(value || '')

    useEffect(() => {
        setInternalValue(value)
    }, [value])

    useEffect(() => {
        if (!rule && !required) setError(false)
    }, [rule, required])

    const optionalId = (id) ? { id } : ''
    const classList = ['input-text']

    /** password */
    const [hidden, setHidden] = useState(false)
    let inputType = type
    let toggleText = ''
    if (type === 'password') {
        classList.push('password')
        inputType = (hidden) ? 'text' : 'password'
        toggleText = (hidden) ? 'hide' : 'show'
    }
    /** password */

    if (error) classList.push('err')
    const cls = classList.join(' ')

    const maskUp = e => {

        const v = e.target.value
        const x = v
        setInternalValue(x)

        if (callback) callback(e)

    }

    const changeUp = e => {

        let error = false

        if (!rule && !required) return

        const v = e.target.value

        if (rule) {
            const arr = rule.split(',')
            const method = arr[0]
            const param = arr[1]
            error = validation[method](v, param)
        }

        if (customValidation) {
            error = customValidation(e)
        }

        if (required && !v) {
            error = ' '
        }

        setError(error)

    }

    return (

        <div className="form-field">

            <div className={ cls } { ...optionalId }>

                <label>

                    <ul className="label-row">
                        <li className="description">{ label }</li>
                        { formLookupLink && <NativeFormLookup link={ formLookupLink } /> }
                    </ul>

                    <input
                        type={ inputType }
                        name={ name }
                        placeholder={ placeholder }
                        value={ internalValue }
                        onChange={ (e) => maskUp(e) }
                        onBlur={ (e) => changeUp(e) }
                        data-valid={ !error }
                        data-required={ required }
                        { ...rest }
                    />

                    <div className="password-show-hide" onClick={ () => setHidden(!hidden) }>
                        { toggleText }
                    </div>

                    <SvgNotificationErrorLight className="input-error-icon" />

                </label>

                <div className="message">{ error }</div>

            </div>

        </div>


    )

}

export default NativeInputText
