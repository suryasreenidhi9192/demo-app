import React, { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './ToggleTabs.scss'

/**
 * @public
 * ToggleTabs
 * @param {Array}               params.tabs
 * @param {Function}            params.onSelect
 * @param {String}              params.selectedTab
*/

const ToggleTabs = ({ onSelect, selectedTab, tabs }) => {

    const selectedTabRef = useRef()
    const [selectorStyles, setSelectorStyles] = useState({})

    useLayoutEffect(() => {
        if (selectedTabRef.current) {
            const { offsetLeft: left, offsetWidth: width } = selectedTabRef.current

            setSelectorStyles({ left, width })
        }
    }, [selectedTab])

    return (
        <ul className="toggle-tabs">
            { tabs.map(tab => {
                const { label, name } = tab

                let ref = null
                const classList = ['toggle-tab']
                if (selectedTab === name) {
                    classList.push('is-selected')
                    ref = selectedTabRef
                }
                const cls = classList.join(' ')

                return (
                    <li className={ cls } key={ name } onClick={ () => onSelect(name) } ref={ ref }>{ label }</li>
                )
            })}
            <li className="selection-indicator" style={ selectorStyles } />
        </ul>
    )
}

ToggleTabs.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedTab: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }))
}

export default ToggleTabs
