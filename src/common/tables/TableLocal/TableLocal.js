import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Table from '../Table'

/*
*### The TableLocal component is a wrapper for Table that takes a full set of data, 
and automatically handles sorting, filtering, and pagination.
*/
const normalize = (value) => {
    return typeof value === 'string' ? value.toLowerCase() : value + ''
}

const TableLocal = ({
    className,
    columns = [],
    errorMessage,
    filterBy = {},
    loadingMessage,
    maxResults = 5000,
    onUpdateCsvData,
    paging = true,
    resultsPerPage = 50,
    rows = [],
    sortBy = {}
}) => {

    const [filterValues, setFilterValues] = useState({ filterBy, sortBy, page: 1 })

    const applyFilters = () => {

        const { filterBy } = filterValues

        const filters = columns.map(column => {
            const { filterOperator, name } = column

            if (Object.prototype.hasOwnProperty.call(filterBy, name)) {
                const filterValue = normalize(filterBy[name])
                return { filterOperator, filterValue }
            }
            return null
        })

        const filteredRows = rows.filter(row => {

            let addToFilteredRows = true

            filters.forEach((filter, filterIndex) => {
                if (filter === null) return

                const { filterOperator, filterValue } = filter
                const rawData = normalize(row[filterIndex].raw)

                if ((filterOperator === 'Equal' && rawData !== filterValue)
                    || rawData.indexOf(filterValue) === -1) {
                    addToFilteredRows = false
                }
            })

            return addToFilteredRows

        })

        return filteredRows

    }

    const applyPage = (sortedRows) => {

        if (!paging) return sortedRows

        const startIndex = (filterValues.page - 1) * resultsPerPage
        const endIndex = startIndex + resultsPerPage

        return sortedRows.slice(startIndex, endIndex)

    }

    const applySort = filteredRows => {

        const { sortBy: { colName, order } } = filterValues

        if (!colName) return { sortedColumns: columns, sortedRows: filteredRows }

        let sortIndex = 0
        const sortResult = (normalize(order) === 'desc') ? [1, -1] : [-1, 1]

        const sortedColumns = columns.map((column, index) => {
            if (colName === column.name) {
                sortIndex = index
                return { ...column, direction: order }
            }
            const newColumn = { ...column }
            delete newColumn.direction
            return newColumn
        })

        const sortedRows = filteredRows.sort((a, b) => {
            if (a[sortIndex].raw < b[sortIndex].raw) return sortResult[0]
            else if (a[sortIndex].raw > b[sortIndex].raw) return sortResult[1]
            else return 0
        })

        return { sortedColumns, sortedRows }

    }

    const handleFilterChange = filterValues => {
        setFilterValues(filterValues)
    }

    const handleUpdateCsvData = ({ sortedRows, sortedColumns }) => {

        if (!onUpdateCsvData) return

        const csvData = sortedRows.map(row => {
            const csvDataRow = {}

            sortedColumns.forEach((column, index) => {
                csvDataRow[column.label] = row[index].raw
            })

            return csvDataRow
        })

        onUpdateCsvData(csvData)

    }

    const filteredRows = applyFilters()
    const { sortedColumns, sortedRows } = applySort(filteredRows)
    const localRows = applyPage(sortedRows)
    const resultCount = filteredRows.filter(row => !row.meta || !row.meta.doNotCount).length

    handleUpdateCsvData({ sortedColumns, sortedRows })

    return (
        <Table
            className={ className }
            columns={ sortedColumns }
            errorMessage={ errorMessage }
            filterValues={ filterValues }
            isLocalData
            loadingMessage={ loadingMessage }
            maxResults={ maxResults }
            onFilterChange={ handleFilterChange }
            paging={ paging }
            resultsPerPage={ resultsPerPage }
            rows={ localRows }
            totalResults={ resultCount }
        />
    )

}


TableLocal.propTypes = {
    /**
     * Can be used to add a CSS to Table to overwrite or add to existing styles.
     *
     * ```scss
.my-custom-table {
    margin-top: 0px;

    .scroll-wrapper {
        max-height: 300px;
    }
}
```
     */
    className: PropTypes.string,
    /**
     * An array of column objects that is required to populate TableHeader.
     */
    columns: PropTypes.arrayOf(PropTypes.shape({
        /** This MUST be the same as the row name (see below) */
        name: PropTypes.string.isRequired,
        /** Shown as heading text. If not provided, name will be used */
        label: PropTypes.string,
        /** Determines styling */
        type: PropTypes.oneOf([
            'string',
            'code',
            'date',
            'string-numeric',
            'currency',
            'number',
            'hyperlink',
            'long-string'
        ]),
        /** This is required when filtering is enabled. 'string' | 'select' */
        filterType: PropTypes.oneOf(['string', 'select']),
        /** This is required when applying a filter to applicable data. 'Equal' | 'Range' */
        filterOperator: PropTypes.oneOf(['Equal', 'Range']),
        /** Is sorting enabled? Set to true by default */
        sort: PropTypes.bool,
        /** Is filtering enabled? Set to true by default */
        filter: PropTypes.bool,
        /** If set to 'asc' or 'desc' row will sort accordingly */
        direction: PropTypes.oneOf(['asc', 'desc']),
        /** For use with 'select' filterType. Array of { label: string, value: string } */
        selectOptions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }))
    })).isRequired,
    errorMessage: PropTypes.string,
    /**
     * Informs Table to display the loading message while waiting for results.
     * It will display the provided string unless the value is '',
     * in which case, it will simply show 'Loading...'
     * Pass `null` or do not define to hide the loader.
     */
    loadingMessage: PropTypes.string,
    /**
     * Informs Table of how many rows of data are allowed.
     * If more are provided, it will prompt the user to further refine their search.
     */
    maxResults: PropTypes.number,
    /**
     * Returns data for use in exporting CSVs that match table filtering and sorting.
     */
    onUpdateCsvData: PropTypes.func,
    /** Disables paging if `false` */
    paging: PropTypes.bool,
    /**
     * Informs TableLocal of how many results are allowed per page when calculating pagination.
     */
    resultsPerPage: PropTypes.number,
    /**
     * An array of row arrays containing cell objects that is required to populate TableBody.
     *
     * Optional: Makes the entire row clickable and triggers the callback onClick
     *
     * ```javascript
const cell = {
    name: string,           // Required: This MUST match the column name for proper sorting and filtering
    raw: any,               // Required: This is the raw value of the data that is used for filtering and callbacks
    display: any,           // Required: This is what will display in the row cell
    rowspan: number,        // Optional: Sets the rowspan on the < td >
    suppress: boolean,      // Optional: Does not create a < td > for the cell
}

const row = [ cell ]
row.meta = {
    isFirstOfGroup: boolean,  // Optional: Adds an additional border line above the row if true
    onClick: () => callback() // Optional: Makes the entire row clickable and triggers the callback onClick
}
const rows = [ row ]
     ```
     */
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        raw: PropTypes.any,
        display: PropTypes.any,
        rowspan: PropTypes.number,
        suppress: PropTypes.bool
    }))).isRequired,
    /**
     * Informs Table of the initial sort. { colName: columnName, order: 'asc' | 'desc' }
     */
    sortBy: PropTypes.shape({
        colName: PropTypes.string,
        order: PropTypes.oneOf(['asc', 'desc'])
    })
}

export default TableLocal
