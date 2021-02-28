import React from 'react'
import PropTypes from 'prop-types'

import { SvgCaret } from '../../../icons'

import TableFilter from './TableFilter'

import './TableHeader.scss'

const TableHeader = ({
    columns,
    filterValues,
    isLocalData,
    onFilterChange,
    totalResults
}) => {

    const handleFilterChange = ({ name, value }) => {

        const newValues = { ...filterValues }
        const { filterBy } = newValues

        if (!value) delete filterBy[name]
        else { filterBy[name] = value }

        onFilterChange({ ...newValues, page: 1 })

    }

    const handleSortClick = ({ name, direction, isSortable }) => {

        if (!isSortable) return

        const order = direction && direction.toLowerCase() === 'asc' ? 'desc' : 'asc'
        const newValues = { ...filterValues, sortBy: { colName: name, order } }

        onFilterChange(newValues)

    }

    const getColumns = () => {

        const { filterBy = {} } = filterValues
        const showFilters = !(Object.keys(filterBy).length === 0 && totalResults <= 1)

        return columns.map(column => {

            const { direction, filter, label, name, sort } = column

            const isSortable = sort && totalResults > 1
            const labelText = label || name

            const classList = ['heading']
            if (isSortable) { classList.push('is-sortable') }
            if (direction) { classList.push(`sort-${direction.toLowerCase()}`) }
            const cls = classList.join(' ')

            return (

                <th key={ name }>

                    <div className={ cls } onClick={ () => handleSortClick({ name, direction, isSortable }) }>

                        <div className="label">{ labelText }</div>

                        { isSortable &&
                            <>
                                <SvgCaret className="sort-arrow-asc" />
                                <SvgCaret className="sort-arrow-desc" />
                            </>
                        }

                    </div>

                    { showFilters &&
                        <TableFilter
                            column={ column }
                            isEnabled={ filter }
                            isLocalData={ isLocalData }
                            onChange={ handleFilterChange }
                        />
                    }

                </th>

            )

        })
    }

    return (

        <thead className="table-header">
            <tr>
                { getColumns() }
            </tr>
        </thead>

    )

}

TableHeader.propTypes = {
    columns: PropTypes.array,
    filterValues: PropTypes.object,
    isLocalData: PropTypes.bool,
    onFilterChange: PropTypes.func.isRequired,
    totalResults: PropTypes.number
}

export default TableHeader
