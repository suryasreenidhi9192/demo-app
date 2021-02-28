import React from 'react'

import './NativeRadioButtons.scss'

/**

 Since Radio Buttons and Checkboxes do not have change and blur like InputText and Select,
 the callback comes in an onChange passed in and passed as ...rest. For Inputs and Selects,
 we need an additional callback which does not interfere with masking and validations.

 */

const NativeRadioButtons = ({
    name,
    id,
    value = '',
    label,
    options,
    orientation = 'horizontal',
    ...rest
}) => {

    const optionalId = (id) ? { id } : ''
    const classList = ['radio-buttons']
    classList.push(orientation)
    const cls = classList.join(' ')

    return (

        <div className="form-field">

            <label>

                <ul className="label-row">
                    <li className="description">{ label }</li>
                </ul>

                <ul className={ cls } { ...optionalId }>

                { options.map((o, i) => {

                    return (

                        <li className="native-radio" key={ i }>

                            <label className="radio-description">

                                <input
                                    type="radio"
                                    name={ name }
                                    value={ o.value }
                                    defaultChecked={ o.value === value }
                                    { ...rest }

                                />

                                <span className="radio-label">
                                    { o.label }
                                </span>

                            </label>

                        </li>

                    )

                })}

                </ul>

            </label>

        </div>
    )

}

export default NativeRadioButtons
