import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
    SvgNotificationSuccessLight,
    SvgNotificationInfoLight,
    SvgNotificationWarningLight,
    SvgNotificationErrorLight,
    SvgCloseX
} from '../../icons'

import './Alert.scss'

/**
 * @public
 * Builds a dismissable Alert that displays important messages by type
 * @param {React|String}  params.footer        React Component or string to render at the bottom of the Alert
 * @param {String}        params.title         Title placed above message in Alert body
 * @param {String}        params.type          Error info etc. Used to toggle style of Alert
 * @param {Boolean}       params.retain        Retain, do not allow dismiss of Alert
 * @param {Boolean}       params.scroll        Alert should scroll window to the top of the page. Needed for long forms.
 * @param {Function}      params.handleClose   By default handleClose toggles internal state.
 *                                             But it can be overridden when it appears inside a <Modal>
*/
class Alert extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            alertDismissed: false,
            scrolled: false
        }
    }

    componentDidMount() {
        this.conditionallyScroll()
    }

    componentDidUpdate() {
        this.conditionallyScroll()
    }

    conditionallyScroll() {
        const { scroll = false } = this.props
        const { scrolled } = this.state

        if (scroll && !scrolled) {
            window.scrollTo(0, 0)
            this.setState({ scrolled: true })
        }
    }

    getIcon(type) {

        switch (type) {

            case 'success':
                return <SvgNotificationSuccessLight className="alert-icon" />

            case 'error':
                return <SvgNotificationErrorLight className="alert-icon" />

            case 'warning':
                return <SvgNotificationWarningLight className="alert-icon" />

            case 'info':
                return <SvgNotificationInfoLight className="alert-icon" />

            default:
                return <SvgNotificationErrorLight className="alert-icon" />

        }

    }

    render() {

        const {
            children = '',
            type = 'error',
            title = '',
            footer = '',
            retain = false,
            handleClose = () => { this.setState({ alertDismissed: true }) }
        } = this.props

        const isDismissed = (this.state.alertDismissed) ? 'hidden' : ''
        const icon = this.getIcon(type)

        return (

            <div className={ `alert ${type} ${isDismissed}` } role="alert">

                <div className={`alert-header ${type}`}>
                    <span className="header" />
                </div>

                <div className="alert-body">
                    <ul className="layout">
                        <li>
                            { icon }
                        </li>
                        <li>
                            { !!title && <div className="title">{ title }</div> }
                            <div className="message">
                                { children }
                            </div>
                        </li>
                        <li onClick={ handleClose } >
                            { !retain && <SvgCloseX className="close-icon" /> }
                        </li>
                    </ul>

                    <div className="alert-footer">{ footer }</div>

                </div>

            </div>
        )
    }
}

Alert.propTypes = {
    /** React Component or string to render in the body */
    children: PropTypes.node,
    /** React Component or string to render at the bottom of the Alert */
    footer: PropTypes.node,
    /** Title placed above message in Alert body */
    title: PropTypes.string,
    /** Error info etc. Used to toggle style of Alert */
    type: PropTypes.string,
    /** Retain, do not allow dismiss of Alert */
    retain: PropTypes.bool,
    /** Alert should scroll window to the top of the page. Needed for long forms. */
    scroll: PropTypes.bool,
    /** By default handleClose toggles internal state. But it can be overridden when it appears inside a <Modal> */
    handleClose: PropTypes.func
};

export default Alert
