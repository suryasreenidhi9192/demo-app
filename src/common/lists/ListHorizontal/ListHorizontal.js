import React from 'react'
import PropTypes from 'prop-types';

import './ListHorizontal.scss'

/**
 * @public
 * list horizontal allows you to display data horizontally
 * @param {Array}      params.data      Array of data to be displayed as a List
*/

const ListHorizontal = ({ data }) => (

    <ul className="list-horizontal">

        { data.map((item, i) =>
            <li key={i}>
                <dl>
                    <dt>{ item.n }</dt>
                    <dd>{ item.v }</dd>
                </dl>
            </li>
        )}

    </ul>

)

ListHorizontal.propTypes = {
    /** Array of data to be displayed as a List */
    data: PropTypes.arrayOf(
        PropTypes.shape({
            n: PropTypes.any,
            v: PropTypes.any
        })
    )
}

export default ListHorizontal
