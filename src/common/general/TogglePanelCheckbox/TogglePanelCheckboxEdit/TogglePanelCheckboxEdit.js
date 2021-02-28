import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import { SelectionLayout, SelectionCounts, SelectionSearch } from 'app/Global/SelectionCounts'
import { AlertInline, Checkbox, Checkboxes } from '../../../index'

import './TogglePanelCheckboxEdit.scss'

/**
 * @public
 * TogglePanelCheckboxEdit
 * @param {Function}            params.handleChange
 * @param {Boolean}             params.hasErrors
 * @param {Array}               params.listItems
 * @param {Number}              params.minSelections
 * @param {Array}               params.resetDefaultList
 * @param {String}              params.resetLinkText
 * @param {String}              params.selectInstructions
 * @param {Number}              params.totalCount
*/

const TogglePanelCheckboxEdit = ({
    handleChange,
    hasErrors,
    listItems,
    minSelections,
    resetDefaultList,
    resetLinkText,
    selectInstructions,
    totalCount
}) => {

    const [editList, setEditList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [allSelected, setAllSelected] = useState(false)
    const [showError, setShowError] = useState(hasErrors)

    useLayoutEffect(() => { resetList() }, [resetList])

    const resetList = useCallback(() => {

        setEditList([].concat(listItems))
        setSearchQuery('')

    }, [listItems])

    const filterSelectedItems = (list) => list.filter(item => item.enabled)
    const selectedItems = filterSelectedItems(editList)
    const selectedCount = selectedItems.length

    useEffect(() => {

        const checkAllSelected = editList.every(item => item.enabled)

        setAllSelected(checkAllSelected)
        handleChange(editList, selectedCount)

    }, [editList])

    useLayoutEffect(() => { setShowError(hasErrors) }, [hasErrors])

    const handleSearch = (e) => setSearchQuery(e.target.value)

    const handleCheckbox = (e) => {

        e.currentTarget.classList.toggle('sel')
        updateEditList(e.currentTarget)

    }

    const updateEditList = (el) => {

        const checkboxName = el.getAttribute('data-name')

        const updatedEditList = editList.map((item) => {
            return item.label === checkboxName ? { ...item, enabled: !item.enabled } : { ...item }
        })

        setEditList(updatedEditList)

    }

    const handleCheckAll = (e) => {

        const el = e.currentTarget
        el.classList.toggle('group-sel')

        const isChecked = el.classList.contains('group-sel')

        const updatedEditList = editList.map((item) => {
            return !item.required ? { ...item, enabled: isChecked } : { ...item }
        })

        setEditList(updatedEditList)

    }

    const handleReset = () => {

        if (resetDefaultList) {

            setEditList(resetDefaultList)

        } else {

            const updatedEditList = editList.map((item) => {
                return !item.required ? { ...item, enabled: false } : { ...item }
            })

            setEditList(updatedEditList)
        }

    }

    const errorMessage = `Please select at least ${minSelections} items`

    const selectAllClasslist = ['select-all-checkbox']
    if (allSelected) { selectAllClasslist.push('group-sel') }
    const selectAllCls = selectAllClasslist.join(' ')

    return (

        <div className="toggle-panel-edit">

            { showError && <AlertInline>{ errorMessage }</AlertInline>}

            {/* <SelectionLayout>
                <SelectionCounts
                    title={ selectInstructions }
                    total={ totalCount }
                    selected={ selectedCount }
                    resetLink={ resetLinkText }
                    cb={ handleReset }
                />
                <SelectionSearch
                    value={ searchQuery }
                    cb={ handleSearch }
                />
            </SelectionLayout> */}

            <div className="group-check">

                <Checkbox
                    cls={ selectAllCls }
                    name="Select all"
                    cb={ (e) => handleCheckAll(e) }
                />

            </div>

            <Checkboxes cls="toggle-panel-checkboxes">

                { editList.map((item, i) => {

                    const { enabled, label, required } = item

                    const classList = []

                    const showSearch = label.toLowerCase().includes(searchQuery.toLowerCase())
                    const name = required ? `${label} (required)` : label

                    if (enabled) classList.push('sel')
                    if (!showSearch) classList.push('search-hidden')
                    if (required) classList.push('is-required disabled')

                    return (
                        <Checkbox
                            cls={ classList.join(' ') }
                            value={ label }
                            name={ name }
                            key={ i }
                            cb={ (e) => handleCheckbox(e) }
                            disabled={ required }
                        />
                    )

                })}

            </Checkboxes>

        </div>


    )
}

TogglePanelCheckboxEdit.propTypes = {
    handleChange: PropTypes.func.isRequired,
    hasErrors: PropTypes.bool,
    listItems: PropTypes.arrayOf(
        PropTypes.shape({
            enabled: PropTypes.bool,
            label: PropTypes.string,
            required: PropTypes.bool
        })
    ).isRequired,
    minSelections: PropTypes.number,
    resetDefaultList: PropTypes.arrayOf(
        PropTypes.shape({
            enabled: PropTypes.bool,
            label: PropTypes.string,
            required: PropTypes.bool
        })
    ).isRequired,
    resetLinkText: PropTypes.string,
    selectInstructions: PropTypes.string,
    totalCount: PropTypes.number
}

export default TogglePanelCheckboxEdit
