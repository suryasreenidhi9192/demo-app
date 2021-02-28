import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
// // import autoBind from 'utils/auto-bind'
import { useHistory } from 'react-router-dom'

import './AccountMenu.scss'

/**
 * @public
 * Builds header with single and multiple menu options in account menu
* @param {String}  params.firstName     First Name string to display as first name in the AccountMenu
 * @param {String}  params.lastName     Last Name string to display as last name in the AccountMenu
 * @param {Array}   params.menuItems    List of menu items to display in the AccountMenu
 * @param {Link}    params.path         Link to navigate on mouse click
 * @param {String}  params.label        Label of the Menu Item
*/

class AccountMenu extends Component {

    constructor(props) {

        super(props)
        // autoBind.react(this)

        this.state = {
            isOpen: false
        }

        this.wrapper = createRef()

    }

    componentWillUnmount() {
        this.registerOffClick(false)
    }

    handleOffClick(event) {

        const { current } = this.wrapper
        if (current && event.target !== current && !current.contains(event.target)) {
            this.setIsOpen(false)
        }

    }

    registerOffClick(isOpen) {

        const method = isOpen ? 'addEventListener' : 'removeEventListener'
        document.body[method]('click', this.handleOffClick)

    }

    setIsOpen(isOpen) {

        this.registerOffClick(isOpen)
        this.setState({ isOpen })

    }

    handleMenuItemClick(path) {
        const history = useHistory();

        history.push(path)
        this.setState({ isOpen: false })

    }

    render() {

        const { firstName, lastName, menuItems } = this.props
        const { isOpen } = this.state
        const classList = ['account-menu']
        if (isOpen) classList.push('is-open')
        const cls = classList.join(' ')

        return (

            <div className={ cls } ref={ this.wrapper }>

                <div className="menu-header" onClick={ () => this.setIsOpen(!isOpen) }>
                    <div className="username">{ firstName + ' ' + lastName }</div>
                    <div className="arrow">▾</div>
                </div>

                <ul className="menu-items">

                    { menuItems.map(menuItem => {

                        const { path, label } = menuItem

                        return (
                            <li
                                className="menu-item"
                                key={ label }
                                onClick={ () => this.handleMenuItemClick(path) }
                                role="button"
                                tabIndex="0"
                            >
                                { label }
                            </li>
                        )

                    })}

                </ul>

            </div>

        )

    }

}


AccountMenu.propTypes = {
    /** First Name string to display as first name in the AccountMenu */
    firstName: PropTypes.string,
    /** Last Name string to display as last name in the AccountMenu */
    lastName: PropTypes.string,
    /** List of menu items to display in the AccountMenu */
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string,
        label: PropTypes.string
      })
    )
}

export default AccountMenu
