import React from 'react'
import PropTypes from 'prop-types'

import './Tiles.scss'

/**
 * @public
 * Tiles
 * @param {Node}            params.children
 * @param {String}          params.cls
*/

const Tiles = ({
    children = [],
    cls = ''
}) => {

    const className = 'tiles ' + cls
    /** 4 empties seems safe even for desktop */
    const qty = children.length > 2 ? 4 : 0

    const arr = []
    for (let i = 0; i < qty; i++) {
        arr.push('')
    }

    return (

        <ul className={ className }>

            { children }
            {
                arr.map((e, i) => (
                    <li className="tile empty-item" key={ i } />
                ))
            }

        </ul>

    )

}

Tiles.propTypes = {
    /** React Component or string to render in the Tiles */
    children: PropTypes.node,
    /** string to render CSS class */
    cls: PropTypes.string
}

export default Tiles
