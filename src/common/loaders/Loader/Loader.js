import React from 'react'
import { LoaderInline } from '../../../common'
import PropTypes from 'prop-types'

import './Loader.scss'

/**
 * @public
 * Simple Loader component displayed by boolean prop
 * @param   {Boolean}     props.isLoading       Controls display of Loader
 * @param   {Node}        props.children        React Component or string to render in the body
 * @return  {Node}                              React Component
 */

const Loader = ({ isLoading, children }) => (
    isLoading &&
    <div className="loader">
        <LoaderInline message={ children } />
    </div>
) || null

Loader.propTypes = {
    /** Controls display of Loader */
    isLoading: PropTypes.bool,
    /** React Component or string to render in the body */
    children: PropTypes.node
}

export default Loader
