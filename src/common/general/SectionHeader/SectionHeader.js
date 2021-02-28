import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '../../index'

import './SectionHeader.scss'

/**
 * @public
 * Section Header
 * @param {Node}        params.subtitle     React Component or string to render as subtitle in the SectionHeader
 * @param {Node}        params.title        React Component or string to render as title in the SectionHeader
 * @param {Array}       params.actions      Array of Action button for SectionHeader
*/

const SectionHeader = ({ actions = [], subtitle = '', title = '' }) => {

    return (

        <div className="section-header">

            <div className="title">
                <h2>{ title }</h2>
                { subtitle && <div className="subtitle">{ subtitle }</div> }
            </div>

            { actions.map((item, i) => {
                const { onClick, isDisabled = false, label, isHidden = false } = item

                const classNames = ['action-wrapper']
                if (isHidden) classNames.push('hidden-action')
                const cls = classNames.join(' ')

                return (
                    <div className={ cls } key={ i }>
                        <Button display="secondary" disabled={ isDisabled } onClick={ onClick }>
                            { label }
                        </Button>
                    </div>
                )
            })}

        </div>

    )

}

SectionHeader.propTypes = {
    /** Array of Action button for SectionHeader */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            onClick: PropTypes.func,
            isDisabled: PropTypes.bool,
            label: PropTypes.node,
            isHidden: PropTypes.bool
        })
    ),
    /** React Component or string to render as subtitle in the SectionHeader */
    subtitle: PropTypes.node,
    /** React Component or string to render as title in the SectionHeader */
    title: PropTypes.node
}

export default SectionHeader
