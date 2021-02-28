import React from 'react'

import './NativeCheckbox.scss'

/**

 Since Radio Buttons and Checkboxes do not have change and blur like InputText and Select,
 the callback comes in an onChange passed in and passed as ...rest. For Inputs and Selects,
 we need an additional callback which does not interfere with masking and validations.

 */

const NativeCheckbox = ({
    name,
    id,
    value = false,
    label,
    ...rest
}) => {

    const optionalId = (id) ? { id } : ''
    const classList = ['native-checkbox']
    const cls = classList.join(' ')

    return (

        <div className="form-field">

            <div className={ cls } { ...optionalId }>

                <label>
                    <input
                        type="checkbox"
                        name={ name}
                        defaultChecked={ value }
                        { ...rest }
                    />
                    <span className="checkmark" />
                    <div className="checkbox-text">
                        { label }
                    </div>
                </label>

            </div>

        </div>

    )

}

export default NativeCheckbox
