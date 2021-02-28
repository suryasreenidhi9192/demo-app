import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// import { isContentEquivalent } from 'utils'

import { SvgCaret } from '../../icons'

import './MultiSelect.scss'

/**
 * @public
 * Multi Select is used to select multiple options in the dropdown
 * @param {String}      params.label               Label of the option group
 * @param {String}      params.name                Name of the option group
 * @param {Function}    params.onChange            Callback function called when there is a change in selection
 * @param {Array}       params.options             Array of options to be displayed in a group
 * @param {Array}       params.selectedItems       Array of option values which are selected
 */

const MultiSelect = ({ label, name, onChange, options, selectedItems = [] }) => {

    const [selections, setSelections] = useState(selectedItems)
    const [isOpen, setIsOpen] = useState(false)
    const [focusedItem, setFocusedItem] = useState(-1)
    const selectionsRef = useRef(selections)
    const multiSelectRef = useRef()

    useEffect(() => {
        setSelections(selectedItems)
        if (!isContentEquivalent(selectionsRef.current, selectedItems)) selectionsRef.current = selectedItems
    }, [selectedItems])

    const handleOffClick = event => {
        const { current } = multiSelectRef

        if (current && event.target !== current && !current.contains(event.target)) {
            updateIsOpen(false)
        }
    }

    const registerOffClick = isOpen => {

        const method = isOpen ? 'addEventListener' : 'removeEventListener'
        document.body[method]('click', handleOffClick)

    }

    const updateIsOpen = isOpen => {

        if (!isOpen) {
            if (onChange && !isContentEquivalent(selectionsRef.current, selectedItems)) onChange(selectionsRef.current)
            setFocusedItem(-1)
        }

        registerOffClick(isOpen)
        setIsOpen(isOpen)

    }

    const handleKeyDown = event => {
        event.stopPropagation()
        event.preventDefault()

        switch (event.key) {

            case 'ArrowDown':
                if (!isOpen) updateIsOpen(true)
                if (focusedItem < options.length - 1) setFocusedItem(focusedItem + 1)
                break

            case 'ArrowUp':
                if (focusedItem > -1) {
                    const newFocusedItem = focusedItem - 1
                    if (newFocusedItem === -1) updateIsOpen(false)
                    setFocusedItem(newFocusedItem)
                }
                break

            case ' ':
                if (focusedItem < 0) updateIsOpen(!isOpen)
                else handleSelect(focusedItem)
                break

            case 'Enter':
                if (isOpen) {
                    const newSelections = options.map(option => option.value)
                    selectionsRef.current = newSelections
                    setSelections(newSelections)
                }
                break;

            case 'Backspace':
                selectionsRef.current = []
                setSelections([])
                break;

            case 'Escape':
                updateIsOpen(false)
                break

            default:

        }

    }

    const handleSelect = index => {

        const { value } = options[index]

        const isSelected = selections.includes(value)
        const newSelections = isSelected ? selections.filter(item => item !== value) : [...selections, value]
        selectionsRef.current = newSelections
        setSelections(newSelections)

    }

    const buttonId = name + '-button'
    const labelId = name + '-label'
    const listId = name + '-list'

    const selectedLabels = []
    options.forEach(option => { if (selections.includes(option.value)) selectedLabels.push(option.label) })
    const selectionText = selectedLabels.length ? selectedLabels.join(' • ') : 'None'
    let buttonText = selections.length !== options.length ? selectionText : 'All'

    const classList = ['multi-select']
    if (isOpen) classList.push('is-open')
    if (!options.length) {
        buttonText = 'No options available'
        classList.push('is-disabled')
    }
    const cls = classList.join(' ')

    return (
        <div className={ cls } ref={ multiSelectRef }>
            { label && <label id={ labelId }>{ label }</label> }
            { label && <label className="is-hidden" id={ labelId }>{ name }</label> }
            <button
                aria-haspopup="listbox"
                aria-labelledby={ `${labelId} ${buttonId}` }
                id={ buttonId }
                onClick={ () => updateIsOpen(!isOpen) }
                onKeyDown={ handleKeyDown }
            >
                { buttonText }
                <SvgCaret className="arrow" />
            </button>
            <ul
                aria-labelledby={ labelId }
                id={ listId }
                onKeyDown={ handleKeyDown }
                role="listbox"
                tabIndex="-1"
            >
                {
                    options.map((option, index) => {
                        const { label, value } = option
                        const isFocused = index === focusedItem
                        const isSelected = selections.includes(value)
                        const classList = ['option']
                        if (isFocused) classList.push('is-focused')
                        if (isSelected) classList.push('is-selected')
                        const cls = classList.join(' ')

                        return (
                            <li
                                aria-selected={ isFocused }
                                className={ cls }
                                key={ index }
                                role="option"
                                onClick={ () => handleSelect(index) }
                            >

                                { label }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

MultiSelect.propTypes = {
    /** Label of the option group */
    label: PropTypes.string,
    /** Name of the option group */
    name: PropTypes.string.isRequired,
    /** Callback function called when there is a change in selection */
    onChange: PropTypes.func.isRequired,
    /** Array of options to be displayed in a group */
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    /** Array of option values which are selected */
    selectedItems: PropTypes.array.isRequired
}

export default MultiSelect
