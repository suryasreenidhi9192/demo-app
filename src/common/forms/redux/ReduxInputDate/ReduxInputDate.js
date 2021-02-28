import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import PropTypes from 'prop-types'

import { SvgNotificationErrorLight } from '../../../icons'

import './ReduxInputDate.scss'

/**
 * @public
 * Creates a date picker using the react-datepicker component
 * @param  {String}         props.dateFormat     A string defining the format for
 *                                               the date string returned to
 *                                               the form
 * @param  {Object}         props.input:         Redux Forms passed virtual input object
 * @param  {Any}            props.input.value    Form value held by the virtual input object
 * @param  {Function}       props.input.onChange Event triggered by the change of
 *                                               the virtual input object
 * @param  {String|Node}    props.label          String or JSX to use as a label
 * @param  {Boolean}        props.disabled       Flag to disable the field
 * @param  {Object}         props.meta:          Redux Forms passed error information
 * @param  {Boolean}        props.meta.touched   Boolean indicating that the user
 *                                               manipulated the form control
 * @param  {String}         props.meta.error     String value of error to display
 * @param  {Array}         ...extraProps         Rest param for pass-thru props
 *                                               to the datepicker library
 * @return {React}                               React component
*/

const ReduxInputDate = ({
    dateFormat = 'MM/DD/YYYY',
    input: { value, onChange } = {},
    label, disabled,
    meta: { touched, error } = {},
    ...extraProps
}) => {

    const err = (touched && error) && typeof error === 'string'
    const errClass = (err) ? ' err' : ''
    const cls = `input-date ${errClass}`

    const formatChangedValue = (momentValue) => {
        return onChange(momentValue ? momentValue.format(dateFormat) : '')
    }

    const disabledFlag = (!!disabled) ? 'disabled' : null;

    return (

        <div className={ cls }>

            <label>

                <div className="description">
                    { label }
                </div>

                <DatePicker
                    { ...extraProps }
                    disabled={ !!disabledFlag }
                    dateFormat={ dateFormat }
                    selected={ value ? moment(value) : undefined }
                    onChange={ formatChangedValue }
                />

                {/* This never displays. b/c we are now using react data picker? */}
                { err && <SvgNotificationErrorLight className="input-error-icon" /> }

            </label>

            { err && <div className="message">{ error }</div> }

        </div>

    )

}

ReduxInputDate.propTypes = {
    /* A string defining the format for the date string returned to  the form */
    dateFormat: PropTypes.string,
    /* Redux Forms passed virtual input object */
    input: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.node,
        PropTypes.string
    ]),
    /* String or JSX to use as a label */
    label: PropTypes.node,
    /* Redux Forms passed error information */
    meta: PropTypes.object
}

export default ReduxInputDate
