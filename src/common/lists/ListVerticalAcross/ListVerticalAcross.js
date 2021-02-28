import React from 'react'
import PropTypes from 'prop-types';
import './ListVerticalAcross.scss'

/**
 * @public
 * list vertical across allows you to display data vertically across
 * @param {Array}      params.data      Array of data to be displayed as a List
*/

const ListVerticalAcross = ({ data }) => {

    return (

        <div className="list-vertical-across">

            { data.map((item, i) =>
                <dl key={i} className="item">
                    <dt>{ item.n }</dt>
                    <dd>{ item.v }</dd>
                </dl>
            )}

        </div>

    )

}

ListVerticalAcross.propTypes = {
    /** Array of data to be displayed as a List */
    data: PropTypes.arrayOf(
        PropTypes.shape({
            n: PropTypes.any,
            v: PropTypes.any
        })
    )
}

export default ListVerticalAcross
