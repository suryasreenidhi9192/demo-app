import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Legend, LineChart, PieChart } from '../../../common'
import './ChartWithLegend.scss'

const ChartWithLegend = ({
    className,
    data,
    dataType,
    decimalPlaces,
    donutInfo,
    height,
    horizontalGuides,
    legendHeaders,
    legendType,
    lineWidth,
    labels,
    minTopValue,
    onViewDetails,
    pointRadius,
    prependLegend = false,
    scale,
    type,
    verticalGuides,
    thresholds,
    width
}) => {

    const getChartFromType = () => {
        switch (type) {
            case 'donut':
            case 'pie':
                return PieChart
            case 'line':
                return LineChart
            default:
                return null
        }
    }

    const [selection, setSelection] = useState(null)
    const Chart = getChartFromType()

    const classList = ['chart-with-legend']
    if (className) classList.push(className)
    if (prependLegend) classList.push('prepended-legend')
    const cls = classList.join(' ')

    const legendCls = type === 'donut' ? 'inline' : null

    const legendComponent = (
        <Legend
            className={ legendCls }
            data={ data }
            headers={ legendHeaders }
            onSelect={ setSelection }
            onViewDetails={ onViewDetails }
            selection={ selection }
            type={ legendType }
        />
    )

    return (
        <div className={ cls } data-type={ type }>
            { prependLegend && legendComponent }
            { Chart &&
                <Chart
                    data={ data }
                    dataType={ dataType }
                    decimalPlaces={ decimalPlaces }
                    donutInfo={ donutInfo }
                    height={ height }
                    horizontalGuides={ horizontalGuides }
                    lineWidth={ lineWidth }
                    labels={ labels }
                    minTopValue={ minTopValue }
                    onSelect={ setSelection }
                    pointRadius={ pointRadius }
                    selection={ selection }
                    scale={ scale }
                    thresholds={ thresholds }
                    type={ type }
                    verticalGuides={ verticalGuides }
                    width={ width }
                />
            }
            { !prependLegend && legendComponent }
        </div>
    )
}

const headers = PropTypes.shape({
    label: PropTypes.node, 
    colSpan: PropTypes.node
})

const LabelsProps = PropTypes.shape({
    align: PropTypes.oneOf(['end', 'middle', 'start']),
    text: PropTypes.string
})

const ThresholdProps = PropTypes.shape({
    color: PropTypes.color,
    description: PropTypes.string,
    isStriped: PropTypes.bool,
    end: PropTypes.number,
    start: PropTypes.number
})

ChartWithLegend.propTypes = {
    /** @type {node} chart data */
    className: PropTypes.node,
    /** @type {array} Array of chart data */
    data: PropTypes.array,
    /** @type {string} specifies the type of data values and formats the labels accordingly */
    dataType: PropTypes.oneOf(['currency', 'number', 'percent']),
    /** @type {number} number of decimal places to show */
    decimalPlaces: PropTypes.number,
    /** @type {node} JSX element */
    donutInfo: PropTypes.node,
    /** @type {number} viewbox height */
    height: PropTypes.number,
    /** @type {number} number of horizontal guides and Y-axis labels to show */
    horizontalGuides: PropTypes.number,
    /** @type {array} Array of headers to display as a legends */
    legendHeaders: PropTypes.arrayOf(headers),
    /** @type {string} type of legend */
    legendType: PropTypes.string,
    /** @type {number} thickness of data lines */
    lineWidth: PropTypes.number,
    /** @type {array} X-axis labels */
    labels: PropTypes.arrayOf(LabelsProps),
    /** @type {number} lowest number allowed as the top left label's value */
    minTopValue: PropTypes.number,
    /** @type {function} callback on view pressed */
    onViewDetails: PropTypes.func,
    /** @type {number} radius of data point circle */
    pointRadius: PropTypes.number,
    prependLegend: PropTypes.bool,
    /** @type {number} size of text and lines (0.5 === 50%, 1 === 100%)  */
    scale: PropTypes.number,
    type: PropTypes.node,
    /** @type {number} number of vertical guides to show */
    verticalGuides: PropTypes.number,
    /** @type {array} threshold indicators */
    thresholds: PropTypes.arrayOf(ThresholdProps),
    /** @type {number} viewbox width */
    width: PropTypes.number
}

export default ChartWithLegend
