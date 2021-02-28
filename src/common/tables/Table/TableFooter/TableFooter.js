import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { formatNumber } from 'utils'

import { SvgCaret } from '../../../icons'

import './TableFooter.scss'

/**
 * @public
 * TableFooter to display the footer functionality of the table
 * @param   {Function}      params.onPageChange         Callback function called when page is changed
 * @param   {Number}        params.page                 Displays number of page
 * @param   {Boolean}       params.paging               Flag to control paging
 * @param   {Number}        params.resultsPerPage       Control to restrict number of results per page
 * @param   {Number}        params.totalResults         Displays total number of results
*/

const TableFooter = ({ onPageChange, page, paging, resultsPerPage, totalResults }) => {

    const [inputValue, setInputValue] = useState(page)
    const totalPages = Math.ceil(totalResults / resultsPerPage)

    useEffect(() => {
        setInputValue(page)
    }, [page])

    const handleInputBlur = () => {
        if (inputValue !== page) setInputValue(page)
    }

    const handleInputChange = event => {

        let newValue = Number(event.target.value)

        if (newValue < 1) newValue = 1
        if (newValue > totalPages) newValue = totalPages

        setInputValue(newValue)

    }

    const handleInputFocus = event => event.target.select()

    const handleInputKeyDown = event => {

        if (event.key === 'Enter') {
            handlePageChange(Number(event.target.value))
        }

        if (event.key === 'Backspace' && inputValue < 10) {
            event.preventDefault()
            event.target.select()
        }

    }

    const handlePageChange = requestedPage => {

        const newValue = { page: requestedPage }

        if (requestedPage < 1) newValue.page = 1
        if (requestedPage > totalPages) newValue.page = totalPages

        if (newValue.page !== page) {
            onPageChange(newValue)
        }

    }

    const resultsText = totalResults === 1 ? 'total result' : 'total results'
    const inputSize = (totalPages + '').length

    const controlsClassList = ['page-controls']
    if (page === 1) controlsClassList.push('prev-disabled')
    if (page === totalPages) controlsClassList.push('next-disabled')
    const controlsCls = controlsClassList.join(' ')

    return (

        <div className="table-footer">

            <div className="total-results">
                <span className="count">{ totalResults }</span>
                <span className="count-label">{ resultsText }</span>
            </div>

            { (paging && totalPages > 1) &&

                <div className={ controlsCls }>

                    <div className="page-control prev" onClick={ () => handlePageChange(page - 1) }>
                        <SvgCaret />
                    </div>

                    <input
                        max={ totalPages }
                        min={ 1 }
                        onBlur={ handleInputBlur }
                        onChange={ handleInputChange }
                        onFocus={ handleInputFocus }
                        onKeyDown={ handleInputKeyDown }
                        size={ inputSize }
                        type="number"
                        value={ inputValue }
                    />

                    <span className="count">/ { totalPages }</span>

                    <div className="page-control next" onClick={ () => handlePageChange(page + 1) }>
                        <SvgCaret />
                    </div>

                </div>
            }

        </div>

    )

}

TableFooter.propTypes = {
    /** Callback function called when page is changed */
    onPageChange: PropTypes.func.isRequired,
    /** Displays number of page */
    page: PropTypes.number,
    /** Flag to control paging */
    paging: PropTypes.bool,
    /** Control to restrict number of results per page */
    resultsPerPage: PropTypes.number,
    /** Displays total number of results */
    totalResults: PropTypes.number
}

export default TableFooter
