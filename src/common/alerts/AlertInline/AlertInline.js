import React from 'react'
import PropTypes from 'prop-types';

import {
    SvgNotificationSuccessLight,
    SvgNotificationInfoLight,
    SvgNotificationWarningLight,
    SvgNotificationErrorLight
} from '../../icons'

import './AlertInline.scss'

/**
 * @public
 * Creates an inline styled block for important messages for the user
 * @param  {String}     options.type        Error info etc. Used to toggle style of Alert
 * @param  {Boolean}    options.showAlert   Flag used to toggle visibility of Alert
 * @param  {Node}       options.children    React Component or string to render in the Alert body
*/
const AlertInline = ({ type = 'error', showAlert = true, children }) => {

    const Icon = (() => {

        switch (type) {

            case 'success':
                return SvgNotificationSuccessLight

            case 'info':
                return SvgNotificationInfoLight

            case 'warning':
                return SvgNotificationWarningLight

            default:
                return SvgNotificationErrorLight

        }

    })()

    return (

        showAlert && (

            <div className={`alert-inline ${type}`} role="alert">
                <Icon className="alert-icon" />
                <div className="message">{ children }</div>
            </div>

        )

    ) || null

}

AlertInline.propTypes = {
    /** React Component or string to render in the body */
    children: PropTypes.node,
    /** Error info etc. Used to toggle style of Alert */
    type: PropTypes.string
};

export default AlertInline
