import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import {
    SvgNotificationSuccessLight,
    SvgNotificationInfoLight,
    SvgNotificationWarningLight,
    SvgNotificationErrorLight,
    SvgCloseX
} from '../../icons'

import { Button, ButtonBar } from '../../index'

import './ModalAlert.scss'

/**
 * @public
 * ModalAlert to display alert as a modal
 * @param {Boolean}         params.isOpen            Toogle to open/close the modal
 * @param {String}          params.title            For displaying title of the ModalAlert
 * @param {Node}            params.children         React Component or string to render in the Modal
 * @param {String}          params.type             Render type of Alert to be displayed. It can be 'success', 'info', 'warning'
 * @param {Boolean}         params.allowDismiss     Allowing dismiss of modal on escape key
 * @param {Funtion}         params.handleOK         Callback on Okay button being pressed
 * @param {Funtion}         params.handleCancel     Callback on cancel button being pressed
 * @param {Funtion}         params.handleClose      Callback function for handling close
 */

const getIcon = (type) => {

    switch (type) {
        case 'success':
            return <SvgNotificationSuccessLight className="alert-icon" />
        case 'info':
            return <SvgNotificationInfoLight className="alert-icon" />
        case 'warning':
            return <SvgNotificationWarningLight className="alert-icon" />
        default:
            return <SvgNotificationErrorLight className="alert-icon" />
    }

}

const ModalAlert = ({

    isOpen,
    title = '',
    children = '',
    type = 'error',
    allowDismiss,
    handleOK,
    handleCancel,
    handleClose = handleCancel,

     /** this is just the default prop, you can override with any custom footer */
    footer = (
        <ButtonBar>
            { !!handleCancel &&
                <Button display="secondary" onClick={ handleCancel }>
                    Cancel
                </Button>
            }
            { !!handleOK &&
                <Button display="secondary" onClick={ handleOK }>
                    OK
                </Button>
            }
        </ButtonBar>
    )

}) => {

    const modalEscapeKeyHandler = (e) => {
        if (e.key === 'Escape') {
            if (handleClose) handleClose()
        }
    }

    useEffect(() => {

        if (isOpen) {
            document.body.classList.add('modal-alert-open')
            if (allowDismiss) document.body.addEventListener('keyup', modalEscapeKeyHandler)
        } else {
            document.body.classList.remove('modal-alert-open')
            if (allowDismiss) document.body.removeEventListener('keyup', modalEscapeKeyHandler)
        }

        return () => {
            document.body.classList.remove('modal-alert-open')
            if (allowDismiss) document.body.removeEventListener('keyup', modalEscapeKeyHandler)
        }

    }, [isOpen])

    const icon = getIcon(type)

    if (isOpen) return (

        <div
            className="modal-alert-container"
            data-hidden={ !isOpen }
            onClick={ (e) => {
                if (!allowDismiss) return
                if (e.target === e.currentTarget) handleClose()
            }}
        >

            <div
                className="modal-alert"
            >

                <ul className="alert-layout">

                    <li className="alert-header">
                        <ol className={ type }>
                            <li>
                                { icon }
                            </li>
                            <li>
                                { title }
                            </li>
                            <li onClick={ handleClose }>
                                { (!!allowDismiss && !!handleClose) && <SvgCloseX className="close-icon" /> }
                            </li>
                        </ol>
                    </li>

                    <li className="alert-body">
                        { children }
                    </li>

                    <li className="alert-footer">
                        { footer }
                    </li>

                </ul>

            </div>

        </div>

    )

    return null

}

ModalAlert.propTypes = {
    /** Toogle to open/close the modal */
    isOpen: PropTypes.bool,
    /** For displaying title of the ModalAlert */
    title: PropTypes.string,
    /** React Component or string to render in the Modal  */
    children: PropTypes.node,
    /** Render type of Alert to be displayed. It can be 'success', 'info', 'warning'  */
    type: PropTypes.string,
    /** Allowing dismiss of modal on escape key */
    allowDismiss: PropTypes.bool,
    /** Callback on Okay button being pressed */
    handleOK: PropTypes.func,
    /** Callback on cancel button being pressed */
    handleCancel: PropTypes.func,
    /** Callback function for handling close */
    handleClose: PropTypes.func,
}

export default ModalAlert
