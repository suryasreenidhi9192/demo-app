import React from 'react'
import PropTypes from 'prop-types'
import { AnchorButton } from '../../../common'
// import { formatNumber } from 'utils'
import './PercentageBars.scss'

const PercentageBars = ({ data, onViewDetails, total }) => {

    const handleViewDetails = name => () => {
        if (onViewDetails) onViewDetails(name)
    }

    const bars = data.map(bar => {
        const { color, name, subtitle, title, value } = bar
        const formattedValue = value
        const percent = value / total * 100
        const percentage = parseFloat(percent.toFixed(2)) + '%'
        const width = percent * 0.8 + '%'
        const style = { backgroundColor: color, flex: '0 0' + width }

        return (
            <div className="percentage-bar" key={ name }>
                <div className="title">{ title } { subtitle && <span className="subtitle">{ subtitle }</span> }</div>
                <div className="bar-container">
                    <div className="bar" style={ style } />
                    { !onViewDetails &&
                        <span className="value">{ formattedValue }</span>
                    }
                    { !!onViewDetails &&
                        <AnchorButton className="value" onClick={ handleViewDetails(name) }>
                            { formattedValue }
                        </AnchorButton>
                    }
                    <div className="percentage">({ percentage })</div>
                </div>
            </div>
        )
    })

    return (
        <div className="percentage-bars">
            { bars }
        </div>
    )

}

PercentageBars.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string, 
            name: PropTypes.string, 
            subtitle: PropTypes.node, 
            title: PropTypes.node, 
            value: PropTypes.node
        })
    ), 
    onViewDetails: PropTypes.func, 
    total: PropTypes.number
}

export default PercentageBars
