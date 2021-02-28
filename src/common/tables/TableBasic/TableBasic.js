import React from 'react'
import PropTypes from 'prop-types'

import './TableBasic.scss'

const TableBasic = ({ rows, columns }) => {

    return (

        <div className="table-basic">

            <div className="scroll-wrapper">

                <table>

                    <thead>
                        <tr>
                            { columns.map((column, columnIndex) =>
                                <th key={ columnIndex }>{ column.name }</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        { rows.map((row, rowIndex) => (
                            <tr key={ rowIndex }>
                                { row.map((cell, cellIndex) => {
                                    const { type } = columns[cellIndex]
                                    const isNumeric = ['currency', 'number'].indexOf(type) > -1
                                    const isNegative = (cell + '').indexOf('-') === 0
                                    const classList = [type]
                                    if (isNumeric && isNegative) classList.push('negative')
                                    const cls = classList.join(' ')

                                    return <td className={ cls } key={ cellIndex }>{ cell }</td>
                                })}
                            </tr>
                        )) }
                    </tbody>

                </table>

            </div>

        </div>

    )

}

TableBasic.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.array
    ),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string
        })
    )
}

export default TableBasic

