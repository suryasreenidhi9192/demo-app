import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { curryWithEnterKeyPress } from '../../shared/utils'

import './Accordion.scss'

/**
 * @public
 * Builds a toggleable Accordion that collapses and expands with a CSS class
 * @param {String}  params.title        String to display at the top of the Accordion to trigger the toggling behavior
 * @param {Node}    options.children    React Component or string to render in the Accordion body
*/
const Accordion = ({
    children,
    isOpen,
    onClick,
    title
}) => {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!!isOpen) setOpen(isOpen)
    }, [isOpen])

    const toggleAccordion = () => {
        if (onClick) onClick()
        setOpen(!open)
    }

    const classList = ['accordion']
    classList.push(open ? 'open' : 'closed')
    const cls = classList.join(' ')

    return (
        <div className={ cls }>

            <a
                aria-expanded={ open }
                className="title"
                onClick={ toggleAccordion }
                onKeyPress={ curryWithEnterKeyPress(toggleAccordion) }
                tabIndex={0}
            >

                <div className="text">{ title }</div>

                <div className="accordion-icon">
                    <div className="plus-minus-icon" />
                </div>


            </a>

            <div className="content">
                { children }
            </div>

        </div>
    )
}

Accordion.propTypes = {
    /** React Component or string to render in the body */
    children: PropTypes.node,
    /** Toggle to open Accordion on default */
    isOpen: PropTypes.bool,
    /** Callback function on accordion toggle */
    onClick: PropTypes.func,
    /** Title string to display as the link to open and close the Accordion */
    title: PropTypes.string
}

export default Accordion
