import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import TableAlert from './TableAlert'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import LoaderInline from '../../loaders/LoaderInline'

import './Table.scss'

/**
 * @public
 * The Table component is used to display tabular data.
 It consists of TableHeader, TableAlert, TableBody, and TableFooter. It has sorting,
 filtering, and pagination built in.
 * @param {Array}         params.rows
 * @param {Number}        params.totalResults
*/

const defaultColumn = {
    name: '',
    label: '',
    type: 'string',
    filterType: 'string',
    filterOperator: '',
    sort: true,
    filter: true,
    direction: undefined
}

const defaultRowCell = {
    name: '',
    raw: '',
    display: '',
    rowspan: undefined,
    suppress: false
}

const Table = ({
    className,
    columns = [],
    errorMessage,
    filterValues,
    isLocalData = false,
    loadingMessage,
    maxResults,
    onFilterChange,
    paging = true,
    resultsPerPage = 50,
    rows = [],
    totalResults = 0
}) => {

    useEffect(() => {
        scrollRef.current.scrollTop = 0
    }, [rows, scrollRef])

    const scrollRef = useRef()

    const handlePageChange = ({ page: newPage }) => {
        onFilterChange({ ...filterValues, page: newPage })
    }

    const hasResults = !!totalResults && (!maxResults || totalResults <= maxResults)
    const isLoading = typeof loadingMessage === 'string'
    const hasNoAlert = (isLoading || hasResults) && !errorMessage

    const completeColumns = columns.map(column => ({ ...defaultColumn, ...column }))
    const completeRows = (isLoading && !rows.length)
        ? Array(10).fill(columns.map(() => ({ ...defaultRowCell })))
        : rows.map(row => {
            const completeRow = row.map(cell => ({ ...defaultRowCell, ...cell }))
            completeRow.meta = row.meta
            return completeRow
        })

    const classList = ['table']
    if (className) classList.push(className)
    const cls = classList.join(' ')

    return (

        <div className={ cls }>

            <div className="scroll-wrapper" ref={ scrollRef }>
                { isLoading && <LoaderInline message={ loadingMessage } /> }

                <table>

                    <TableHeader
                        columns={ completeColumns }
                        filterValues={ filterValues }
                        isLocalData={ isLocalData }
                        onFilterChange={ onFilterChange }
                        totalResults={ totalResults }
                    />

                    { hasNoAlert
                        ? <TableBody filterValues={ filterValues } columns={ completeColumns } rows={ completeRows } />
                        : <TableAlert
                            columns={ completeColumns }
                            errorMessage={ errorMessage }
                            maxResults={ maxResults }
                            totalResults={ totalResults}
                        />
                    }

                </table>

            </div>

            { hasResults &&
                <TableFooter
                    onPageChange={ handlePageChange }
                    page={ filterValues.page }
                    paging={ paging }
                    resultsPerPage={ resultsPerPage }
                    totalResults={ totalResults }
                />
            }

        </div>

    )

}

Table.propTypes = {
    /**
     *  Can be used to add a CSS to Table to overwrite or add to existing styles.
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
     * An array of column objects that is required to populate TableHeader
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
        filterType: PropTypes.oneOf(['date', 'string', 'select']),
        /** This is required when applying a filter to applicable data */
        filterOperator: PropTypes.string,
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
     * Informs Table of the current applied filters and sorting information.
     */
    filterValues: PropTypes.shape({
        /** { columnName: filterValue } */
        filterBy: PropTypes.object,
        /** { colName: columnName, order: 'asc' | 'desc' } */
        sortBy: PropTypes.shape({
            colName: PropTypes.string,
            order: PropTypes.oneOf(['asc', 'desc'])
        }),
        page: PropTypes.number.isRequired
    }).isRequired,
    /**
     * Informs Table if the data is stored locally, allowing for instant results when filtering
     */
    isLocalData: PropTypes.bool,
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
     * Called to update state whenever a filter input field is updated
     */
    onFilterChange: PropTypes.func.isRequired,
    /** Disables paging if `false` */
    paging: PropTypes.bool,
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
    /** Informs Table of how many results there are AFTER filters have been applied */
    totalResults: PropTypes.number.isRequired
}

export default Table
