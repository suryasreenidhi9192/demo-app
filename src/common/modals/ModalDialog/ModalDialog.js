import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { SvgCloseX } from '../../icons'

import { Button, ButtonBar } from '../../index'

import './ModalDialog.scss'

/**
 * @public
 * ModalDialog to display component as a modal
 * @param {String}      params.title        Title for the Dialog
 * @param {String}      params.type         Class name to define the type of the ModalDialog
 * @param {String}      params.size         Class name to define the size of the ModalDialog
 * @param {Boolean}     params.isOpen       Toogle to open/close the modal
 * @param {Boolean}     params.isDisabled   Toogle to disable Okay button
 * @param {Node}        params.children     React Component or string to render in the body
 * @param {Boolean}     params.allowDismiss Allowing dismiss of modal on escape key
 * @param {Boolean}     params.handleOK     Toggle to show/hide Okay button
 * @param {String}      params.handleOKText Custom text that appears in hollow button for Okay action
 * @param {Boolean}     params.handleCancel Toggle to show/hide cancel button
 * @param {String}      params.handleOKText Custom text that appears in hollow button for Cancel action
 * @param {Function}    params.handleClose  Callback function for handling close
 */

const ModalDialog = ({

    title = '',
    type = 'window',
    size = 'large',
    isOpen,
    isDisabled = false,
    children = '',
    allowDismiss,
    handleOK,
    handleOKText = 'OK',
    handleCancel,
    handleCancelText = 'Cancel',
    handleClose = () => {},

     /** this is just the default prop, you can override with any custom footer */
    footer = (
        <ButtonBar>
            { !!handleCancel &&
                <Button display="secondary" onClick={ handleCancel }>
                    { handleCancelText }
                </Button>
            }
            { !!handleOK &&
                <Button display="secondary" disabled={ isDisabled } onClick={ handleOK }>
                    { handleOKText }
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
            document.body.classList.add('modal-dialog-open')
            if (allowDismiss) document.body.addEventListener('keyup', modalEscapeKeyHandler)
        } else {
            document.body.classList.remove('modal-dialog-open')
            if (allowDismiss) document.body.removeEventListener('keyup', modalEscapeKeyHandler)
        }

        return () => {
            document.body.classList.remove('modal-dialog-open')
            if (allowDismiss) document.body.removeEventListener('keyup', modalEscapeKeyHandler)
        }

    }, [isOpen])

    const classList = ['modal-dialog']
    classList.push(type)
    classList.push(size)
    const cls = classList.join(' ')

    if (isOpen) return (

        <div
            className="modal-dialog-container"
            data-hidden={ !isOpen }
            onClick={ (e) => {
                if (!allowDismiss) return
                if (e.target === e.currentTarget) handleClose()
            }}
        >

            <div className={ cls }>

                <ul className="dialog-layout">

                    <li className="dialog-header">
                        <dl>
                            <dt>
                                { title }
                            </dt>
                            <dd onClick={ handleClose }>
                                { (!!allowDismiss && !!handleClose) && <SvgCloseX className="close-icon" /> }
                            </dd>
                        </dl>
                    </li>

                    <li className="dialog-body">
                        { children }
                    </li>

                    <li className="dialog-footer">
                        { footer }
                    </li>

                </ul>

            </div>

        </div>

    )

    return null

}

ModalDialog.propTypes = {
    /** For displaying title of the Dialog */
    title: PropTypes.string,
    /** Class name to define the type of the ModalDialog */
    type: PropTypes.string,
    /** Class name to define the size of the ModalDialog */
    size: PropTypes.string,
    /** Toogle to open/close the modal */
    isOpen: PropTypes.bool,
    /** Toogle to disable Okay button */
    isDisabled: PropTypes.bool,
    /** React Component or string to render in the Modal */
    children: PropTypes.node,
    /** Allowing dismiss of modal on escape key */
    allowDismiss: PropTypes.bool,
    /** Callback on Okay button being pressed */
    handleOK: PropTypes.func,
    /** Custom text that appears in hollow button for Okay action */
    handleOKText: PropTypes.string,
    /** Callback on cancel button being pressed */
    handleCancel: PropTypes.func,
    /** Custom text that appears in hollow button for Cancel action */
    handleCancelText: PropTypes.string,
    /** Callback function for handling close */
    handleClose: PropTypes.func
}

export default ModalDialog
