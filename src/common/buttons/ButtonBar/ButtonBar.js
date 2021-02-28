import React, { Children } from 'react'
import PropTypes from 'prop-types';

import './ButtonBar.scss'

/**
 * @public
 * A component to create Button Bar for layout
 * @param  {Node}       props.children  React Component or string to render in the button/link
*/

const ButtonBar = ({
    justify = '',
    children
}) => {

    const just = (justify) ? `justify-buttons justify-${justify}` : ''

    const arr = Children.count(children) < 2 ? Children.toArray(children) : children

    return (

        <div className={`btn-toolbar ${just}`}>

            <ul className="buttons">

                { arr.map((o, i) => (
                    <li key={i}>
                        {o}
                    </li>
                ))}

            </ul>

        </div>

    )

}

ButtonBar.propTypes = {
    /** React Component or string to render in the button/link */
    children: PropTypes.node
}

export default ButtonBar
