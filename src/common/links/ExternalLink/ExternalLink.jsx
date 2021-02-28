import React from 'react'
import PropTypes from 'prop-types'
import { SvgExternalLink } from '../../icons'

import { AnchorButton } from '../../index'

import './ExternalLink.scss'

/**
 * @public
 * External Link Used for navigating to another place in the application or opening content
 * @param {String}      params.iconPosition     class string to alter position 
 * @param {Function}    params.onClick          Callback function on link pressed
 * @param {Node}        params.children         React Component or string to render in the body
*/

const ExternalLink = ({

    iconPosition = 'after',
    onClick,
    children

}) => (

    <ul className={ `external-link ${iconPosition}` } role="button">

        <li>
            <SvgExternalLink className="external-link-icon" />
        </li>

        <li>
            <AnchorButton onClick={ onClick } >
                { children }
            </AnchorButton>
        </li>

    </ul>

)

ExternalLink.propTypes = {
    /** class to alter position */
    iconPosition: PropTypes.string,
    /** Callback function on link pressed */
    onClick: PropTypes.func,
    /** React Component or string to render in the body */
    children: PropTypes.node
}

export default ExternalLink

