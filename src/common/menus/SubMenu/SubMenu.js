import React, { Component } from 'react'
import PropTypes from 'prop-types'
// // import autoBind from 'utils/auto-bind'

import { AnchorButton } from '../../buttons';

import './SubMenu.scss'

/**
 * @public
 * SubMenu
 * @param   {Array}        params.menuItems     Array of menu Items
*/
class SubMenu extends Component {

    constructor(props) {

        super(props)
        // autoBind.react(this)

    }

    render() {

        const {
            menuItems = []
        } = this.props
        const cls = (menuItems.length > 0) ? 'sub-menu-container' : ''

        return (

            <div className={ cls }>

                { menuItems.map((item, i) => {

                    const {
                        label,
                        callback
                    } = item

                    return (
                        <div className="sub-menu-item" key={ i }>

                            <div className="action" key={ i }>

                                <AnchorButton onClick={ callback }>
                                    { label }
                                </AnchorButton>

                            </div>

                        </div>
                    )

                })

                }

            </div>

        )

    }
}

SubMenu.propTypes = {
     /** Array of menu Items */
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            callback: PropTypes.func
        })
    )
}

export default SubMenu
