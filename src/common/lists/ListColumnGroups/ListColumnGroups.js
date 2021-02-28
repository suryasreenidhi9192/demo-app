import React from 'react'
import PropTypes from 'prop-types';

import './ListColumnGroups.scss'

/**
 * @public
 * List column Groups allows you to group rows/columns with data
 * @param {Array}      params.data  Array of data to be displayed as a List
 */

const ListColumnGroups = ({ data }) => {

    return (

        <ul className="list-two-column-groups">

            { !!data && data.map((col, i) =>

                <li key={i}>

                    { col.map((row, i) =>
                        <dl key={i}>
                            <dt>{ row.n }</dt>
                            <dd>{ row.v }</dd>
                        </dl>
                    )}

                </li>

            )}

        </ul>

    )

}

ListColumnGroups.propTypes = {
    /** Array of data to be displayed as a List */
    data: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                n: PropTypes.any,
                v: PropTypes.any
            })
        )
    )
}

export default ListColumnGroups
