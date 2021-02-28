import React from 'react'
import PropTypes from 'prop-types'
import './LoaderInline.scss'

/**
 * @public
 * loader inline utilized to have inline loaders
 * @param {String}      params.message          custom loading message
 */

const LoaderInline = ({ message }) => {
    const loadingMessage = message || 'loading...'

    return (
        <div className="loader-inline">
            <div className="loading-box">
                <div className="spinner" />
                <div className="message">
                    { loadingMessage }
                </div>
            </div>
        </div>
    )
}

LoaderInline.propTypes = {
    /** custom loading message */
    message: PropTypes.string
}

export default LoaderInline
