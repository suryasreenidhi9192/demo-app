import React from 'react'
import PropTypes from 'prop-types'
import './PieChart.scss'

const PieChart = ({
    data,
    donutInfo,
    onSelect,
    selection,
    type
}) => {

    const handleSelect = selectedName => () => {
        if (onSelect) {
            onSelect(selectedName === selection ? null : selectedName)
        }
    }

    const getCoordinatesForPercent = percent => {

        const x = Math.cos(2 * Math.PI * percent)
        const y = Math.sin(2 * Math.PI * percent)

        return [x, y]
    }

    const Slices = () => {

        let cumulativePercent = 0

        return data.map((slice, index) => {

            const { color, name, percent } = slice

            if (percent === 0) return null

            const style = color ? { fill: color } : null

            const classList = [`slice slice-${index}`]
            if (selection && selection !== name) classList.push('is-inactive')
            const cls = classList.join(' ')

            if (percent === 1) {
                return (
                    <circle
                        className={ cls }
                        key={ name }
                        name={ name }
                        onClick={ handleSelect(name) }
                        r={ 1 }
                        rx={ 0 }
                        ry={ 0 }
                        style={ style }
                    />
                )
            }

            const [startX, startY] = getCoordinatesForPercent(cumulativePercent)
            cumulativePercent += percent
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent)
            const largeArcFlag = slice.percent > 0.5 ? 1 : 0

            const pathData =
                `M ${startX} ${startY}` +
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}` +
                `L 0 0 L ${startX} ${startY}`

            return (
                <path
                    className={ cls }
                    d={ pathData }
                    key={ name }
                    name={ name }
                    onClick={ handleSelect(name) }
                    style={ style }
                />
            )

        });

    }

    return (
        <svg className="pie-chart" viewBox="-1 -1 2 2" type={ type }>
            <circle className="background" r={ 1 } rx={ 0 } ry={ 0 } />
            <Slices />
            { type === 'donut' &&
                <>
                    <circle className="donut-hole" r={ 0.875 } rx={ 0 } ry={ 0 } />
                    { donutInfo &&
                        <g className="donut-info">
                            { donutInfo.value &&
                                <text className="donut-value" x="0" y="-0.07">{ donutInfo.value }</text>
                            }
                            { donutInfo.label &&
                                <text className="donut-label" x="0" y="0.175">{ donutInfo.label }</text>
                            }
                        </g>
                    }
                </>
            }
        </svg>
    )

}

PieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string, 
            name: PropTypes.string, 
            percent: PropTypes.node
        })
    ),
    donutInfo: PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    }),
    onSelect: PropTypes.func,
    selection: PropTypes.node,
    type: PropTypes.string
}

export default PieChart
