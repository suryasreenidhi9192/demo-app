import React from 'react'
import PropTypes from 'prop-types';

import './ListVertical.scss'

/**
 * @public
 * list vertical allows you to display data vertically
 * @param {Array}       params.data     Array of data to be displayed as a List
*/

const ListVertical = ({ data }) => {

    return (

        <div className="list-vertical">

            { data.map((item, i) =>
                <dl key={i} className="item">
                    <dt>{ item.n }</dt>
                    <dd>{ item.v }</dd>
                </dl>
            )}

        </div>

    )

}

ListVertical.propTypes = {
    /** Array of data to be displayed as a List */
    data: PropTypes.arrayOf(
        PropTypes.shape({
            n: PropTypes.any,
            v: PropTypes.any
        })
    )
}

export default ListVertical
