import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, useHistory } from 'react-router-dom'

import './RouterTabs.scss'

/**
 * Router Tabs allows you to navigate between two tabs
 * @param {Array}       params.tabs     Array of objects to be displayed as a Tabs
 */


const RouterTabs = ({
    location: { pathname },
    tabs
}) => {
    const history = useHistory();

    const handleClick = (e, path) => {
        e.preventDefault()
        history.push(path)
    }

    return (

        <ul className="router-tabs">

            { tabs.map((tab, i) => {

                const { name, path } = tab
                const sel = pathname.startsWith(path)
                const className = sel ? 'selected' : ''

                return (

                    <li key={ i }>

                        <a
                            href={ path }
                            className={ className }
                            onClick={ (e) => handleClick(e, path) }
                            aria-selected={ sel }
                            role="tab"
                        >
                            { name }
                        </a>

                    </li>

                )
            }) }

        </ul>

    )

}

RouterTabs.propTypes = {
    /** Array of objects to be displayed as a Tabs */
    tabs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    })).isRequired

}

export default withRouter(RouterTabs)

