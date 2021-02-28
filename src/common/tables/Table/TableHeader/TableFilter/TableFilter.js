import React from 'react'
import PropTypes from 'prop-types'

import { SvgCaret } from '../../../../icons'

import './TableFilter.scss'

const TableFilter = ({ column, isEnabled, isLocalData, onChange }) => {

    if (!isEnabled) return <div className="table-filter" />

    const handleKeyDown = event => {
        if (!isLocalData && event.key === 'Enter') onChange(event.target)
    }

    const handleInput = event => {
        if (isLocalData) onChange(event.target)
    }

    const { filterType, filterValue, name, selectOptions } = column

    switch (filterType) {

        case 'string': return (

            <div className="table-filter input-filter">
                <input
                    defaultValue={ filterValue }
                    name={ name }
                    onInput={ handleInput }
                    onKeyDown={ handleKeyDown }
                    type="text"
                />
            </div>

        )

        case 'select': return (

            <div className="table-filter select-filter">
                <select
                    defaultValue={ filterValue }
                    name={ name }
                    onChange={ event => onChange(event.target) }
                >
                    { selectOptions.map((option, index) => {
                        const { value, label } = option
                        return <option value={ value } key={ index }>{ label }</option>
                    })}
                </select>
                <SvgCaret className="select-arrow" />
            </div>

        )

        default:
            return <div className="table-filter" />
    }

}

TableFilter.propTypes = {
    column: PropTypes.object,
    isEnabled: PropTypes.bool,
    isLocalData: PropTypes.bool,
    onChange: PropTypes.func
}

export default TableFilter
