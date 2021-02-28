import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BreakdownBar, Legend } from '../../../common'
import './BreakdownBar.scss'

const BreakdownBars = ({ data, legend, onViewDetails }) => {

    const [selection, setSelection] = useState('')

    const breakdownBars = data.map((bar, index) => {
        const { data, label } = bar

        return (
            <BreakdownBar
                data={ data }
                key={ index }
                label={ label }
                legend={ legend }
                onSelect={ setSelection }
                selection={ selection }
            />
        )
    })

    const legends = legend.map((group, index) => {
        const { color, data: groupData } = group
        const legendData = groupData.map((item, itemIndex) => (
            { ...item, style: { backgroundColor: color, opacity: 1 - (itemIndex * 0.2) } }
        ))

        return (
            <Legend
                data={ legendData }
                key={ index}
                onSelect={ setSelection }
                onViewDetails={ onViewDetails }
                selection={ selection}
                type="value"
            />
        )
    })

    return (
        <div className="breakdown-bars">
            { breakdownBars }
            { legends }
        </div>
    )
}

BreakdownBars.propTypes = {
    /** Array of node to display the data */
    data: PropTypes.array,
    /** Array of node to display the label data */
    legend: PropTypes.array,
    /** Callback function on target pressed */
    onViewDetails: PropTypes.func
}

export default BreakdownBars
