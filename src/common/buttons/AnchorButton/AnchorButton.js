import React from 'react'
import PropTypes from 'prop-types';

import { curryWithPreventDefault } from '../../../common/shared/utils/events'

import './AnchorButton.scss'

/**
 * @public
 * A component to create HTML anchors with shorcuts for underlining and prevent default on click handlers
 * @param  {Node|String}    props.children  React Component or string to render in the button/link
 * @param  {Boolean}        props.disabled  Disables the button/link
 * @param  {Function}       props.onClick   Fires curryWithPreventDefault util wrapping this callback,
                                            allowing `href` to be set for crawlers or screen readers
 * @param  {Boolean}        props.underline Sets the link to underline or not
 * @param  {...Array}       props.rest      Rest params to pass onto html anchor
 * @return {Node}                           React Component
 */
const AnchorButton = ({ children, disabled, onClick, underline, ...rest }) => {

    const extraProps = {}
    if (!!disabled) extraProps.disabled = 'disabled'
    const disabledClass = (!!disabled) ? 'disabled' : ''
    const underlineClass = underline ? 'underline' : ''
    const cls = `anchor-button ${disabledClass} ${underlineClass}`

    return (

        <a
            href="#"
            role="button"
            tabIndex="0"
            className={ cls }
            onClick={ curryWithPreventDefault(onClick) }
            {...extraProps}
            {...rest}
        >
            { children }
        </a>

    )

}

AnchorButton.propTypes = {
    /** React Component or string to render in the button/link */
    children: PropTypes.node,
    /** Disables the button/link */
    disabled: PropTypes.bool,
    /** Sets the link to underline or not */
    underline: PropTypes.bool,
    /** fires curryWithPreventDefault util wrapping this callback,
    allowing `href` to be set for crawlers or screen readers */
    onClick: PropTypes.func
};

export default AnchorButton
