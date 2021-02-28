import React, { useState, useEffect } from 'react'

import { SvgNotificationErrorLight, SvgCaret } from '../../../icons'

import './NativeSelect.scss'

const NativeSelect = ({
    name,
    id,
    value = '',
    label,
    options,
    customValidation,
    callback,
    required,
    ...rest
}) => {

    const [error, setError] = useState(false)
    const [internalValue, setInternalValue] = useState(value || '')

    useEffect(() => {
        setInternalValue(value)
    }, [value])

    const optionalId = (id) ? { id } : ''
    const classList = ['select']
    if (error) classList.push('err')
    const cls = classList.join(' ')

    const maskUp = e => {

        let error = false
        const v = e.target.value
        setInternalValue(v)

        if (required && !v) {
            error = ' '
        }

        setError(error)

        if (callback) callback(e)

    }

    const changeUp = e => {

        let error = false

        const v = e.target.value

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

                    <div className="description">
                        { label }
                    </div>

                    <select
                        name={ name }
                        value={ internalValue }
                        onChange={ (e) => maskUp(e) }
                        onBlur={ (e) => changeUp(e) }
                        data-required={ required }
                        data-valid={ !error }
                        { ...rest }
                    >

                        { options.map((o) => (
                            <option value={o.value} key={o.value}>
                                { o.label }
                            </option>
                        ))}

                    </select>

                    <SvgCaret className="select-caret-icon" />

                    <SvgNotificationErrorLight className="select-error-icon" />


                </label>

                <div className="message">{ error }</div>

            </div>

        </div>

    )

}

export default NativeSelect
