import React, { Component } from 'react'
import PropTypes from 'prop-types'
// // import autoBind from 'utils/auto-bind'
import { AnchorButton } from '../../../common'

/**
 * @public
 * Tile
 * @param {Boolean}        params.children
 * @param {Function}       params.onTitleLinkClick
 * @param {Function}       params.onClick
 * @param {Node}           params.children
 * @param {Node}           params.title
 * @param {Node}           params.subTitle
 * @param {Node}           params.titleLinkText
*/
class Tile extends Component {

    constructor(props) {

        super(props)
        // autoBind.react(this)

    }

    render() {

        const {
            children,
            className,
            hollow,
            onClick,
            onTitleLinkClick,
            title = '',
            subTitle = '',
            titleLinkText = 'View Details'
        } = this.props

        const classList = ['tile']
        if (className) classList.push(className)
        if (hollow) classList.push('hollow')
        if (onClick) classList.push('is-clickable')
        const cls = classList.join(' ')

        return (

            <li className={ cls } key={ title } onClick={ onClick }>

                <ol className="tile-layout">
                    { !!title &&
                        <li className="title">
                            <h3>{ title }</h3>
                            { !!onTitleLinkClick &&
                                <AnchorButton onClick={ onTitleLinkClick }>
                                    { titleLinkText }
                                </AnchorButton>
                            }
                        </li>
                    }
                    { !!subTitle &&
                        <li className="subTitle">{ subTitle }</li>
                    }

                    <li className="content">
                        { children }
                    </li>

                    <li className="footer" />

                </ol>

            </li>

        )

    }

}

Tile.propTypes = {
    /** React Component or string to render in the body */
    children: PropTypes.node,
    /** Flag to control */
    hollow: PropTypes.bool,
    /** callback function to be used on target pressed */
    onClick: PropTypes.func,
    /** callback function to be used on target pressed */
    onTitleLinkClick: PropTypes.func,
    /** React Component or string to render as a title in the Tile */
    title: PropTypes.node,
    /** React Component or string to render as a sub title in the Tile */
    subTitle: PropTypes.node,
    /** React Component or string to render as a title link in the Tile */
    titleLinkText: PropTypes.node
}

export default Tile
