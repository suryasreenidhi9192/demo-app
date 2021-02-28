import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import './Breadcrumbs.scss'

/**
 * @public
 * Builds Breadcrumbs as a secondary form of navigation
 * @param {String}  params.bc   List of items to been showed as a breadcrumbs
*/

const history = useHistory();
const Breadcrumbs = ({ bc }) => {

    const length = bc.length

    return (

        <div className="breadcrumbs">

            { bc.map((o, i) => {

                console.log(o.v)
                const isLast = length - 1 === i

                if (isLast) {
                    return <span key={ i }>{ o.n }</span>
                } else {
                    return (
                        <Fragment key={ i }>
                            <a onClick={ () => history.push(o.v) }>{ o.n }</a>
                            <span className="separator">&gt;</span>
                        </Fragment>
                    )
                }

            })}

        </div>

    )

}


Breadcrumbs.propTypes = {
    /** List of items to been showed as a breadcrumbs */
    bc: PropTypes.array
}

export default Breadcrumbs
