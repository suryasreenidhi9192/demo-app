import React from 'react'
import PropTypes from 'prop-types'
import './TableBody.scss'

/**
 * @public
 * TableBody defines the body of the table
 * @param   {Array}         params.columns          Array of columns object of the table
 * @param   {Array}         params.rows             Array of rows object of the table
*/


const TableBody = ({ filterValues = {}, columns, rows }) => {
    const { sortBy = {} } = filterValues
    const getCells = row => {

        return row.map((cell, cellIndex) => {

            if (cell.suppress) return null

            const { display, name, raw, rowspan } = cell
            const { type } = columns[cellIndex]
            const classList = [type]
            if (['currency', 'number'].indexOf(type) > -1 && raw < 0) classList.push('negative')
            if (sortBy.colName === name) classList.push('sorted-column')
            const cls = classList.join(' ')

            return (

                <td className={ cls } key={ cellIndex } rowSpan={ rowspan } >
                    { display }
                </td>

            )

        })

    }

    const getRows = () => {

        return rows.map((row, rowIndex) => {

            const classList = []
            let onClick = null

            if (row.meta) {
                if (row.meta.isFirstOfGroup) classList.push('new-group')
                if (row.meta.onClick) {
                    classList.push('is-clickable')
                    onClick = () => {
                        if (window.getSelection().toString()) return
                        row.meta.onClick()
                    }
                }
            }

            const cls = classList.join(' ')

            return (

                <tr className={ cls } key={rowIndex} onClick={ onClick }>
                    { getCells(row) }
                </tr>

            )

        })

    }


    return (

        <tbody className="table-body">
            { getRows() }
        </tbody>

    )

}

TableBody.propTypes = {
    /** Array of columns object of the table */
    columns: PropTypes.array.isRequired,
    /**  Array of rows object of the table */
    rows: PropTypes.array.isRequired
}

export default TableBody
