import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { bringToFront, getChartExtremes, getFormatterFromType, getLeftPadding, formatData } from './utilities'
import './LineChart.scss'

const LineChart = ({
    data,
    dataGapLabel = 'No Data Available',
    dataType = 'number',
    decimalPlaces = 0,
    height = 200,
    horizontalGuides = 5,
    gridPadding = 0.05,
    lineWidth,
    labels,
    minTopValue = 100,
    onSelect,
    pointRadius,
    scale = 1,
    selection,
    thresholds = [],
    verticalGuides = -1,
    width = 400
}) => {

    const handleSelect = (selectedName, callback) => () => {

        if (callback) callback()

        else if (onSelect) {
            onSelect(selectedName === selection ? null : selectedName)
        }

    }

    const fontSize = width / 40 * scale
    const textLineHeight = fontSize * 2
    const dataLineWidth = typeof lineWidth === 'number' ? lineWidth : fontSize / 4
    const sidePadding = pointRadius * 3 || dataLineWidth * 3

    const lines = formatData(data, dataType)

    const { max, min, hasDataGap } = getChartExtremes({ lines, minTopValue })

    const format = dataType
    const leftPadding = getLeftPadding({ fontSize, horizontalGuides, maxY: format(max.y, decimalPlaces), sidePadding })

    const padding = {
        top: textLineHeight + ((thresholds.length + (hasDataGap ? 1.5 : 0.5)) * textLineHeight),
        right: sidePadding,
        left: leftPadding,
        bottom: textLineHeight * 1.25,
        grid: width * gridPadding
    }

    const grid = {
        width: width - padding.left - padding.right - (padding.grid * 2),
        height: height - padding.top - padding.bottom
    }

    const getXCoordinate = pointIndex =>
        Math.round((max.x ? pointIndex / max.x : 0) * grid.width + padding.left + padding.grid)

    const getYCoordinate = value => {
        const absMin = Math.abs(min.y)
        return Math.round(grid.height - ((value + absMin) / (max.y + absMin)) * grid.height + padding.top)
    }

    const coordinates = lines.map(line => line.data.map((point, pointIndex) => {

        const { value } = point

        if (value === null) return '!'

        const x = getXCoordinate(pointIndex)
        const y = getYCoordinate(value)

        return `${x},${y}`

    }).join(' '))


    const AxisX = () => {
        if (horizontalGuides === -1) return null
        const points = `${padding.left},${height - padding.bottom} ${width - padding.right},${height - padding.bottom}`
        return <polyline className="axis x-axis" points={ points } />
    }

    const AxisY = () => {
        if (verticalGuides === -1) return null
        const points = `${padding.left},${padding.top} ${padding.left},${height - padding.bottom}`
        return <polyline className="axis y-axis" points={ points } />
    }

    const DataLines = () => {

        let frontLineIndex = -1

        const dataPoints = lines.map((line, lineIndex) => line.data.map((point, pointIndex) => {

            const { color, name } = line
            const { hoverText, onClick, value } = point

            if (dataPointRadius === 0 || value === null) return null

            const backgroundHeight = textLineHeight
            const backgroundY = padding.top + grid.height + fontSize
            const dataPointRadius = typeof pointRadius === 'number' ? pointRadius : dataLineWidth * 1.25
            const dataPointStroke = dataPointRadius * 1.5
            const hitboxRadius = dataPointStroke * 2
            const hoverTextX = grid.width / 2 + padding.left
            const hoverTextY = padding.top + grid.height + textLineHeight
            const x = getXCoordinate(pointIndex)
            const y = getYCoordinate(value)
            const style = color ? { fill: color } : null

            const classList = [`data-point-selector line-${lineIndex} point-${pointIndex}`]
            if (onClick) classList.push('has-callback')
            if (hoverText) classList.push('has-hover-text')
            if (selection && selection !== name) classList.push('is-inactive')
            const cls = classList.join(' ')

            return (
                <g className={ cls } key={ `${lineIndex}${pointIndex}` }>
                    <circle
                        className="hitbox"
                        onClick={ handleSelect(name, onClick) }
                        fill="rgba(0,0,0,0)"
                        cx={ x }
                        cy={ y }
                        r={ hitboxRadius }
                    />
                    <circle className="data-point-stroke" cx={ x } cy={ y } r={ dataPointStroke } />
                    <circle className="data-point" cx={ x } cy={ y } r={ dataPointRadius } style={ style } />
                    <rect
                        className="hover-text-background"
                        height={ backgroundHeight }
                        width={ width }
                        x={ 0 }
                        y={ backgroundY }
                    />
                    <text
                        className="hover-text"
                        textAnchor="middle"
                        style={ { fontSize } }
                        x={ hoverTextX }
                        y={ hoverTextY }
                    >
                        { hoverText }
                    </text>
                </g>
            )

        }))

        const dataLines = coordinates.map((points, index) => {

            const { color = null, name } = lines[index]
            const style = color ? { stroke: color } : null
            const pointsArray = points.split('!')
            const dashedLines = []

            if (pointsArray.length > 1) {
                pointsArray.forEach((pointSet, pointSetIndex) => {
                    const pointPairs = pointSet.trim().split(' ')
                    const firstPair = pointPairs[0]
                    const lastPair = pointPairs[pointPairs.length - 1]

                    if (pointSetIndex === 0) dashedLines[0] = lastPair
                    else {
                        dashedLines[pointSetIndex - 1] = dashedLines[pointSetIndex - 1] + ' ' + firstPair
                        if (pointSetIndex !== pointsArray.length - 1) {
                            dashedLines[pointSetIndex] = lastPair
                        }
                    }
                })
            }

            const classList = [`data-line line-${index}`]
            if (selection) {
                if (selection !== name) classList.push('is-inactive')
                else frontLineIndex = index
            }
            const cls = classList.join(' ')

            return (
                <g className={ cls } key={ index } onClick={ handleSelect(name) }>
                    {
                        pointsArray.map((dataPoints, lineIndex) =>
                            <polyline
                                className={ 'line' }
                                key={ lineIndex }
                                strokeWidth={ dataLineWidth }
                                style={ style }
                                points={ dataPoints }
                            />
                        )
                    }
                    {
                        dashedLines.map((dataPoints, lineIndex) =>
                            <polyline
                                className={ 'line no-data' }
                                key={ lineIndex }
                                strokeWidth={ dataLineWidth }
                                strokeDasharray="2 3"
                                style={ style }
                                points={ dataPoints }
                            />
                        )
                    }
                    { dataPoints[index] }
                </g>
            )

        })

        return bringToFront(frontLineIndex, dataLines)
    }

    const HorizontalGuides = () => {

        if (horizontalGuides < 1) return null

        const startX = padding.left
        const endX = width - padding.right

        return new Array(horizontalGuides).fill(0).map((_, index) => {
            const ratio = (index + 1) / horizontalGuides
            const yCoordinate = grid.height - grid.height * ratio + padding.top

            return (
                <Fragment key={ index }>
                    <polyline
                        className="horizontal-guide"
                        points={ `${startX},${yCoordinate} ${endX},${yCoordinate}` }
                    />
                </Fragment>
            )

        })

    }

    const LabelsBottom = () => {

        if (!labels) return null

        return labels.map((label = {}, index) => {

            if (!label || !label.text) return null

            const { align = 'middle', text } = label
            const x = (max.x ? index / max.x : 0) * grid.width + padding.left + padding.grid
            const y = padding.top + grid.height + textLineHeight

            return (
                <text
                    className="label-bottom"
                    key={ index }
                    textAnchor={ align }
                    style={ { fontSize } }
                    x={ x }
                    y={ y }
                >
                    { text }
                </text>
            )

        })

    }

    const LabelsLeft = () => {

        const stepValue = (Math.abs(min.y) + max.y) / horizontalGuides

        return new Array(horizontalGuides + 1).fill(0).map((_, index) => {
            const x = 0
            const ratio = index / horizontalGuides
            const y = grid.height - grid.height * ratio + padding.top + fontSize / 2.5
            const label = format(min.y + Math.round((index * stepValue)), decimalPlaces)

            return (
                <text
                    className="label-left"
                    key={ index }
                    style={ { fontSize } }
                    x={ x }
                    y={ y }
                >
                    { label }
                </text>
            )
        })

    }

    const Thresholds = () => {

        if (!thresholds.length) return null

        return thresholds.map((threshold, index) => {

            let { end, start } = threshold
            const { color, description, isStriped } = threshold
            if (dataType === 'percent') { end *= 100; start *= 100 }
            if (!end && end !== 0) end = max.y

            const thresholdHeight = getYCoordinate(start) - getYCoordinate(end)
            const thresholdWidth = grid.width + (padding.grid * 2)
            const x = padding.left
            const y = getYCoordinate(end)

            const classList = ['threshold']
            if (isStriped) classList.push('is-striped')
            const cls = classList.join(' ');

            return (
                <g key={ index } className={ cls }>
                    { isStriped &&
                        <pattern id={`stripes-${index}`} patternUnits="userSpaceOnUse" width="3" height="3">
                            <path
                                d="M-.75,.75 l1.5,-1.5 M0,3 l3,-3 M2.25,3.75 l1.5,-1.5"
                                style={{ stroke: color, strokeWidth: 0.75 }}
                            />
                        </pattern>
                    }

                    <text
                        className="top-legend-text"
                        textAnchor="end"
                        style={ { fontSize } }
                        x={ width - padding.right - textLineHeight - fontSize }
                        y={ textLineHeight + (textLineHeight * index) }
                    >
                        { description }
                    </text>
                    <rect
                        className="top-legend-color"
                        height={ fontSize * 1.5 }
                        width={ textLineHeight }
                        fill={ isStriped ? `url(#stripes-${index})` : color }
                        x={ width - padding.right - textLineHeight }
                        y={ fontSize + (textLineHeight * index) }
                    />
                    <rect
                        className="threshold-indicator"
                        fill={ isStriped ? `url(#stripes-${index})` : color }
                        height={ thresholdHeight }
                        width={ thresholdWidth }
                        x={ x }
                        y={ y }
                    />
                </g>
            )

        })

    }

    const DataGapLegend = () => {
        if (!hasDataGap) return null
        const x1 = width - padding.right - textLineHeight
        const x2 = x1 + textLineHeight
        const y1and2 = (fontSize * 1.75) + (textLineHeight * thresholds.length)
        const dataPoints = `${x1},${y1and2} ${x2},${y1and2}`

        return (
            <g>
                <text
                    className="top-legend-text"
                    textAnchor="end"
                    style={ { fontSize } }
                    x={ width - padding.right - textLineHeight - fontSize }
                    y={ textLineHeight + (textLineHeight * thresholds.length) }
                >
                    { dataGapLabel }
                </text>
                <polyline
                    className={ 'top-legend-line' }
                    strokeWidth={ dataLineWidth }
                    strokeDasharray="2 3"
                    points={ dataPoints }
                />
            </g>
        )

    }

    const VerticalGuides = () => {

        if (verticalGuides < 1) return null

        const startY = padding.top
        const endY = height - padding.bottom

        return new Array(verticalGuides).fill(0).map((_, index) => {
            const ratio = (index + 1) / verticalGuides
            const xCoordinate = padding.left + ratio * (width - padding.left - padding.right)

            return (
                <Fragment key={ index }>
                    <polyline
                        className="vertical-guide"
                        points={ `${xCoordinate},${startY} ${xCoordinate},${endY}` }
                    />
                </Fragment>
            )

        })

    }

    return (
        <svg
            className="line-chart"
            viewBox={ `0 0 ${width} ${height}` }
        >
            <Thresholds />
            <DataGapLegend />
            <AxisX />
            <AxisY />
            <HorizontalGuides />
            <VerticalGuides />
            <LabelsBottom />
            <LabelsLeft />
            <DataLines />
        </svg>
    )
}

const LabelsProps = PropTypes.shape({
    align: PropTypes.oneOf(['end', 'middle', 'start']),
    text: PropTypes.string
})

const LineProps = PropTypes.arrayOf(
    PropTypes.shape({
        hoverText: PropTypes.string,
        onClick: PropTypes.func,
        value: PropTypes.number
    })
)

const MultiLineProps = PropTypes.arrayOf(
    PropTypes.shape({
        data: LineProps,
        color: PropTypes.string,
        description: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string
    })
)

const ThresholdProps = PropTypes.shape({
    color: PropTypes.color,
    description: PropTypes.string,
    isStriped: PropTypes.bool,
    end: PropTypes.number,
    start: PropTypes.number
})

LineChart.propTypes = {
    /** @type {array} chart data */
    data: PropTypes.oneOfType([LineProps, MultiLineProps]).isRequired,
    /** @type {string} top legend description for dashed lines that represent gaps in the data */
    dataGapLabel: PropTypes.string,
    /** @type {string} specifies the type of data values and formats the labels accordingly */
    dataType: PropTypes.oneOf(['currency', 'number', 'percent']),
    /** @type {number} number of decimal places to show */
    decimalPlaces: PropTypes.number,
    /** @type {number} viewbox height */
    height: PropTypes.number,
    /** @type {number} number of horizontal guides and Y-axis labels to show */
    horizontalGuides: PropTypes.number,
    /** @type {array} X-axis labels */
    labels: PropTypes.arrayOf(LabelsProps),
    /** @type {number} thickness of data lines */
    lineWidth: PropTypes.number,
    /** @type {number} lowest number allowed as the top left label's value */
    minTopValue: PropTypes.number,
    /** @type {func} callback fired when a line is clicked -- passes name of line as argument */
    onSelect: PropTypes.func,
    /** @type {number} radius of data point circle */
    pointRadius: PropTypes.number,
    /** @type {number} size of text and lines (0.5 === 50%, 1 === 100%)  */
    scale: PropTypes.number,
    /** @type {string} selected line name */
    selection: PropTypes.string,
    /** @type {array} threshold indicators */
    thresholds: PropTypes.arrayOf(ThresholdProps),
    /** @type {number} number of vertical guides to show */
    verticalGuides: PropTypes.number,
    /** @type {number} viewbox width */
    width: PropTypes.number
}

export default LineChart
