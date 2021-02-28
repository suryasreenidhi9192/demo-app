import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ClickScreen } from '../../index'

import './Popover.scss'

/**
 * @public
 * Popover to display component as a popped ovewr screen
 * @param {String}      params.popoverLink      React Component or string to render in the Popover
 * @param {Node}        params.children         React Component or string to render in the Popover 
 */ 

class Popover extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleToggle(e) {

        const { persist } = this.props
        const { open } = this.state
        const el = e.target.parentNode

        if (persist && el.id === 'popover-content') return
        this.setState({ open: !open })

    }

    render() {

        const { children, popoverLink = '' } = this.props
        const { open } = this.state

        return (

            <div className="popover" onClick={ (e) => { this.handleToggle(e) } }>

                { popoverLink }

                { open &&
                    <Fragment>
                        { children }
                        <ClickScreen />
                    </Fragment>
                }

            </div>

        )

    }

}

Popover.propTypes = {
    /** React Component or string to render in the Popover */
    children: PropTypes.node,
    /** React Component or string to render in the Popover */
    popoverLink: PropTypes.node 
}

export default Popover

/**
 *
 * Usage below:
 *
 *

 <Popover popoverLink={ 'popover test' } persist>
    <div className="my-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
        <br /><br />
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        <br /><br />
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </div>
</Popover>

 */
