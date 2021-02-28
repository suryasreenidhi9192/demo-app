import React from 'react'
import PropTypes from 'prop-types'
import './BreakdownBar.scss'

const BreakdownBar = ({ data, label, legend, onSelect, selection }) => {

    const handleSelect = selectedName => () => {
        if (onSelect) {
            onSelect(selectedName === selection ? null : selectedName)
        }
    }

    const groupTotals = data.map(group => group.reduce((total, item) => total + item.value, 0))
    const totalValue = groupTotals.reduce((total, groupTotal) => total + groupTotal, 0)

    const classList = ['breakdown-bar']
    if (selection) classList.push('has-selection')
    const cls = classList.join(' ')

    return (

        <div className={ cls }>

            <div className="label">{ label }</div>
            <div className="groups">
                { data.map((group, groupIndex) => {

                    const groupValue = groupTotals[groupIndex]
                    if (groupValue === 0) return null
                    const groupWidth = (groupValue / totalValue * 100)
                    const isSmall = groupWidth < 3
                    const groupStyle = { width: groupWidth + '%' }
                    const backgroundColor = legend[groupIndex].color

                    return (
                        <div className={ `data-group group-${groupIndex}` } key={ groupIndex } style={ groupStyle }>
                            <div className="group-label">
                                <hr style={ { backgroundColor } }/>
                                { !isSmall && <span>{ groupWidth.toFixed(0) + '%' }</span> }
                                <hr style={ { backgroundColor } }/>
                            </div>
                            <section className="group-breakdown">
                                { group.map((item, itemIndex) => {

                                    const { name, value } = item

                                    const opacity = 1 - (itemIndex * 0.15)
                                    const width = (value / groupValue * 100) + '%'
                                    const itemStyle = { backgroundColor, opacity, width }

                                    const itemClassList = [`data-bar bar-${itemIndex}`]
                                    if (selection && selection !== name) itemClassList.push('is-inactive')
                                    const itemCls = itemClassList.join(' ')

                                    return (
                                        <div
                                            className={ itemCls }
                                            key={ itemIndex }
                                            onClick={ handleSelect(name) }
                                            style={ itemStyle }
                                        />
                                    )

                                })}
                            </section>
                        </div>
                    )

                })}
            </div>

        </div>

    )

}

BreakdownBar.propTypes = {
    /** Array of data populating breakdownbar */
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
    }))),
    /** Label to display on the breakdownbar */
    label: PropTypes.string,
    /** Array of colors to display the data */
    legend: PropTypes.array,
    /** callback function on the target while pressed */
    onSelect: PropTypes.func,
    /** string to carry the selected item */
    selection: PropTypes.string
}
export default BreakdownBar
