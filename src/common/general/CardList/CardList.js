import React from 'react'
import PropTypes from 'prop-types';

import './CardList.scss'

/**
 * @public
 * Simple list generating component accepting an Array of objects with header and body keys
 * @param  {Array}      props.listData   List of "card" objects to map, generating "cards" with "header" and "body" keys
 * @return {Node}                        React Component
*/
const CardList = ({ listData }) => {

    return (

        <ul className="card-list">

            { listData.map((o, i) => (

                <li className="card" key={i}>

                    <div className="header">
                        { o.header }
                    </div>

                    <div className="body">
                        { o.body }
                    </div>

                </li>

            )

            )}

            <li className="card empty-card" />
            <li className="card empty-card" />
            <li className="card empty-card" />

        </ul>

    )

}

CardList.propTypes = {
    /** List of "card" objects to map, generating "cards" */
    listData: PropTypes.arrayOf(
        PropTypes.shape({
            /** React Component or string to render at the top of the Alert */
            header: PropTypes.node,
            /** Content to present as the body of the "card" */
            body: PropTypes.node
        })
    )
}

export default CardList
