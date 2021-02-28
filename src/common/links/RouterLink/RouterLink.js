import React from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'

import { AnchorButton } from '../../index'

/**
 * @public
 * A component to create a generic anchor button
 * @param  {Node|String}    props.children  React Component or string to render in the button/link
 * @param  {Route}          props.route     Route of the button
 * @return {Node}                           React Component
*/
const history = useHistory();

const RouterLink = ({ children, underline, route }) => {

    return (

        <div className="router-link-button">
            <AnchorButton underline={ underline } onClick={ () => history.push(route) }>{ children }</AnchorButton>
        </div>

    )
}

RouterLink.propTypes = {
    /** React Component or string to render in the button/link */
    children: PropTypes.node,
    /** Routes that we direct to */
    route: PropTypes.string
}

export default RouterLink
