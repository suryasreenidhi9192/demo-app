import React from 'react'
import PropTypes from 'prop-types'
import './TogglePanelCheckboxView.scss'

/**
 * @public
 * TogglePanelCheckboxView
 * @param {Boolean}             params.counter 
 * @param {Array}               params.selectedItems
 * @param {Number}              params.totalCount
 * @param {Number}              params.selectedCount
*/

const TogglePanelCheckboxView = ({
    counter,
    selectedCount,
    selectedItems,
    totalCount
}) => {

    return (

        <div className="toggle-panel-view">

            { counter &&

                <div className="counts">
                    <b>{ totalCount }</b> available.
                    &nbsp;
                    <b>{ selectedCount }</b> selected.
                </div>

            }

            <ul>
                {
                    selectedItems.map((item, i) =>
                        <li key={ i }>{ item.label }</li>
                    )
                }
            </ul>

        </div>

    )
}

TogglePanelCheckboxView.propTypes = {
    counter: PropTypes.bool,
    selectedCount: PropTypes.number,
    totalCount: PropTypes.number,
    selectedItems: PropTypes.array.isRequired
}

export default TogglePanelCheckboxView
