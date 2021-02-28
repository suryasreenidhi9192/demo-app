import React from 'react'
import PropTypes from 'prop-types';
import { curryWithPressed } from '../../../common/shared/utils/events'

import './Button.scss'

/**
 * @public
 * A component to create HTML button elements that adds touch mutations for interaction indicators via css
 * @param  {Node}       props.children  React Component or string to render in the button/link
 * @param  {String}     props.type      Sets the html button's attribute type `button||reset||submit`
 * @param  {Boolean}    props.disabled  Disables the button via html attribute
 * @param  {Function}   props.onClick   Fires curryWithPressed util wrapping this callback,
                                        setting a 'pressed' class on the target while pressed
 * @param  {String}     props.size      Sets passed string as a concatenated classname defaults to `normal`
 * @param  {String}     props.display   Sets passed string as a concatenated classname defaults to `primary`
 * @return {Node}                       React Component
*/

const Button = ({
    children,
    type,
    disabled,
    onClick,
    size = 'normal',
    display = 'primary'
}) => {

    const extraProps = {}
    if (!!disabled) extraProps.disabled = 'disabled'
    const disabledClass = (!!disabled) ? 'disabled' : ''
    const cls = `form-button button ${size} ${display} ${disabledClass}`

    return (

        <button
            type={ type }
            className={ cls }
            onClick={ curryWithPressed(onClick) }
            {...extraProps}
        >
            { children }
        </button>

    )

}

Button.propTypes = {
    /** React Component or string to render in the button/link */
    children: PropTypes.node,
    /** Disables the button via html attribute */
    disabled: PropTypes.bool,
    /** Sets the html button's attribute type `button||reset||submit` */
    type: PropTypes.string,
    /** Fires curryWithPressed util wrapping this callback,
    setting a 'pressed' class on the target while pressed */
    onClick: PropTypes.func,
    /** Sets passed string as a concatenated classname */
    size: PropTypes.string,
    /** Sets passed string as a concatenated classname */
    display: PropTypes.string
}

export default Button
