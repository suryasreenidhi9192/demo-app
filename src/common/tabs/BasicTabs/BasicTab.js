import React from 'react'
import PropTypes from 'prop-types'

/**
 * @public
 * Simple prop wrapper to allow Tabs component to select the children and draw
 * the navigation
 * @param  {String}         props.name          Key used for tab navigation
 * @param  {String}         props.label         Label displayed in the tab
 * @param  {String|Node}    props.children      Typical React `children` prop
 * @return {React}                              React Component
 */
const BasicTab = ({ children, name, label }) => {

    return (

        <div data-name={ name } data-label={ label }>
            { children }
        </div>

    )

}

BasicTab.propTypes = {
    /** Key used for tab navigation */
    name: PropTypes.string,
    /** label displayed in the tab */
    label: PropTypes.string,
    /** React Component or string to render in the body */
    children: PropTypes.node
}

export default BasicTab
