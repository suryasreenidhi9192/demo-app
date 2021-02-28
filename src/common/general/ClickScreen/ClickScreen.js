import React from 'react'
import PropTypes from 'prop-types'

import './ClickScreen.scss'

/**
 * @public
 * Builds clickscreen  
 * @param   {String}    params.visible  Toggle to make it visble or not
*/

const ClickScreen = ({ visible = '' }) => {

    let cls = 'global-screen'
    cls += visible ? ' visible' : ''

    return (
        <div id="global-screen" className={ cls } />
    )

}

ClickScreen.propTypes = {
    /** Toggle to make it visble or not */
    visible: PropTypes.string
}

export default ClickScreen
