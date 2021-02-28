import React from 'react'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'

import {
    NativeInputText,
    ReduxCheckbox,
    ReduxInputDate,
    ReduxInputPassword,
    ReduxInputText,
    ReduxRadioGroup,
    ReduxSelect,
    ReduxTextArea
} from '../../index'

import './FormField.scss'

/**
 * @public
 * A component to wrap form fields and enable the switch out of redux form fields.
 * @param {String}      params.type     Type of FormField, It can be 'nativeText || checkbox || date || password || text || radio || select || textarea'
*/

const getComponent = type => {

    switch (type) {
        
        case 'nativeText':
            return NativeInputText
        case 'checkbox':
            return ReduxCheckbox
        case 'date':
            return ReduxInputDate
        case 'password':
            return ReduxInputPassword
        case 'text':
            return ReduxInputText
        case 'radio':
            return ReduxRadioGroup
        case 'select':
            return ReduxSelect
        case 'textarea':
            return ReduxTextArea

        default:
            return ''

    }

}

const FormField = ({
    type = 'text',
    ...rest
}) => {

    const component = getComponent(type)

    return (
        <div className="form-field">
            { component &&
                <Field
                    component={ component }
                    {...rest}
                />
            }
        </div>
    )

}

FormField.propTypes = {
    /** Type of FormField can be  nativeText || checkbox || date || password || text || radio || select || textarea */
    type: PropTypes.string
}

export default FormField
