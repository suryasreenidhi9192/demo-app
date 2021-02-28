import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { AnchorButton } from '../../../common'
import './Legend.scss'

const Legend = ({ className, data, headers, onSelect, onViewDetails, selection, type }) => {

    const handleSelect = selectedName => {
        if (!selectedName) return null

        return () => {
            if (onSelect) {
                onSelect(selectedName === selection ? null : selectedName)
            }
        }
    }

    const handleViewDetails = selectedName => event => {
        event.stopPropagation()
        if (onViewDetails) {
            onViewDetails(selectedName)
        }
    }

    const classList = ['legend']
    if (className) classList.push(className)
    const cls = classList.join(' ')

    return (
        <div className={ cls } data-type={ type }>
            <table>
                { !!headers &&
                    <thead>
                        <tr>
                            { headers.map(({ label, colSpan = null }, index) => (
                                <th className="table-header" colSpan={ colSpan } key={ index }>{ label }</th>
                            ))}
                        </tr>
                    </thead>
                }
                <tbody>
                    { !!headers && <tr><td className="spacer" /></tr> }
                    { data.map((item, index) => {
                        const { color, description, name, style = {}, value, values = [], viewDetailsText } = item

                        const styles = { ...style, backgroundColor: color || style.backgroundColor }

                        const itemClassList = [`legend-item item-${index}`]
                        if (selection && selection !== name) itemClassList.push('is-inactive')
                        const itemCls = itemClassList.join(' ')

                        return (
                            <tr className={ itemCls } key={ name || index } onClick={ handleSelect(name) }>
                                <td className="indicator">
                                    <div className="color" style={ styles } />
                                </td>
                                <td className="description">{ description }</td>

                                { !!values.length &&
                                    values.map(({ className: labelCls, label, value: val, viewDetails }, index) => (
                                    <Fragment key={ index }>
                                        { viewDetails &&
                                            <td className="table-value">
                                                <AnchorButton onClick={ handleViewDetails(name) }>
                                                    { val }
                                                </AnchorButton>
                                            </td>
                                        }
                                        { !viewDetails && <td className="table-value">{ val }</td> }
                                        { !!label && <td className={ `table-value-label ${labelCls}`}>{ label }</td> }
                                    </Fragment>
                                )) }

                                { !values.length &&
                                    <Fragment>
                                        { value != null &&
                                            <td className="value">
                                                { value }
                                                { !!viewDetailsText &&
                                                    <AnchorButton onClick={ handleViewDetails(name) }>
                                                        { viewDetailsText }
                                                    </AnchorButton>
                                                }
                                            </td>

                                        }
                                        { (!value && !!viewDetailsText) && (
                                            <td className="view-details">
                                                <AnchorButton onClick={ handleViewDetails(name) }>
                                                    { viewDetailsText }
                                                </AnchorButton>
                                            </td>
                                        )}
                                    </Fragment>
                                }

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const item = PropTypes.shape({
    color: PropTypes.string, 
    description: PropTypes.string, 
    name: PropTypes.string, 
    style: PropTypes.object, 
    value: PropTypes.node, 
    values: PropTypes.array, 
    viewDetailsText: PropTypes.node
})

Legend.propTypes = {
    className: PropTypes.node, 
    /** @type {array} chart data */
    data: PropTypes.arrayOf(item), 
    /** @type {array} header data */
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node, 
            colSpan: PropTypes.node
        })
    ), 
    /** @type {func} callback fired when a legend is clicked */
    onSelect: PropTypes.func,
    /** @type {func} callback fired when a it is clicked */
    onViewDetails: PropTypes.func,
    /** @type {string} selected name */
    selection: PropTypes.string,
    /** @type {string} type of chart */
    type: PropTypes.string
}

export default Legend
