/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import { AlertInline } from '../../../../common'
import './TableAlert.scss'

/**
 * @public
 * TableAlert to display alert on top of table
 * @param   {Array}         params.columns          Array of column object of the table
 * @param   {String}        params.errorMessage     Error message to be displayed
 * @param   {Number}        params.maxResults       Displayed as a string in a warning message
 * @param   {Number}        params.totalResults     Displayed as a string in a warning message
*/

const TableAlert = ({ columns, errorMessage, maxResults, totalResults }) => {

    const noResultsFound = 'No results found.'
    const maxExceeded = `Your search has returned more than ${maxResults} results. Please further refine your search.`
    const warningMessage = totalResults < 1 ? noResultsFound : maxExceeded

    return (

        <tbody className="table-alert">

            <tr>

                <td colSpan={ columns.length }>
                    { !errorMessage
                        ? <AlertInline type="warning">{ warningMessage }</AlertInline>
                        : <AlertInline>{ errorMessage }</AlertInline>
                    }
                </td>

            </tr>

        </tbody>

    )

}

TableAlert.propTypes = {
    /** Array of column object of the table */
    columns: PropTypes.array.isRequired,
    /** Error message to be displayed */
    errorMessage: PropTypes.string,
    /** Displayed as a string in a warning message */
    maxResults: PropTypes.number,
    /** Displayed as a string in a warning message */
    totalResults: PropTypes.number.isRequired
}

export default TableAlert
