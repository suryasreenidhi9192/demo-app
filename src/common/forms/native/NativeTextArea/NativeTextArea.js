import React, { useState } from 'react'

// import { validation, masks } from 'utils'

import './NativeTextArea.scss'

const NativeTextArea = ({
    name,
    id,
    value: initValue,
    label,
    placeholder,
    mask,
    rule,
    customValidation,
    required,
    ...rest
}) => {

    const [value, setValue] = useState(initValue || '')
    const [error, setError] = useState(false)

    const optionalId = (id) ? { id } : ''
    const classList = ['textarea']
    if (error) classList.push('err')
    const cls = classList.join(' ')

    const maskUp = e => {

        const v = e.target.value
        const x = v
        setValue(x)

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

                    <div className="description">
                        { label }
                    </div>

                    <textarea
                        name={ name }
                        placeholder={ placeholder }
                        value={ value }
                        onChange={ (e) => maskUp(e) }
                        onBlur={ (e) => changeUp(e) }
                        data-valid={ !error }
                        data-required={ required }
                        { ...rest }
                    >
                        { value }
                    </textarea>

                </label>

                <div className="message">{ error }</div>

            </div>

        </div>

    )

}

export default NativeTextArea
