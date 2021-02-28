import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import { AnchorButton, FormPanel, ButtonBar, Button } from '../../index'

import { TogglePanelCheckboxView } from './TogglePanelCheckboxView'
import { TogglePanelCheckboxEdit } from './TogglePanelCheckboxEdit'

import './TogglePanelCheckbox.scss'

/**
 * @public
 * TogglePanelCheckbox
 * @param {Boolean}             params.viewCounter
 * @param {Array}               params.listItems
 * @param {Number}              params.minSelections
 * @param {String}              params.panelTitle
 * @param {String}              params.resetDefaultList
 * @param {String}              params.resetLinkText
 * @param {Function}            params.save
 * @param {String}              params.selectInstructions
*/

const TogglePanelCheckbox = ({
    listItems,
    minSelections,
    panelTitle,
    resetDefaultList,
    resetLinkText,
    save,
    selectInstructions,
    viewCounter = false
}) => {

    const [editMode, setEditMode] = useState(false)
    const [list, setList] = useState([])
    const [disableSave, setDisableSave] = useState(false)

    const filterSelectedItems = (list) => list.filter(item => item.enabled)
    const viewSelectedItems = filterSelectedItems(listItems)

    const selectedCount = viewSelectedItems.length
    const totalCount = listItems.length

    const toggle = () => { setEditMode(mode => !mode) }

    const handleChange = (list, count) => {

        const disableSave = count < minSelections

        setList(list)
        setDisableSave(disableSave)

    }

    const handleSave = () => {

        save(list)
        toggle()

    }

    return (
        <section className="toggle-panel">

            <div className="toggle" onClick={ () => toggle() }>
                <AnchorButton>{ editMode ? 'Cancel' : 'Edit' }</AnchorButton>
            </div>

            <FormPanel legend={ panelTitle }>

                { !editMode &&

                    <TogglePanelCheckboxView
                        counter={ viewCounter }
                        totalCount={ totalCount }
                        selectedCount={ selectedCount }
                        selectedItems={ viewSelectedItems }
                    />

                }

                { editMode &&

                    <Fragment>

                        <TogglePanelCheckboxEdit
                            resetDefaultList={ resetDefaultList }
                            listItems={ listItems }
                            handleChange={ handleChange }
                            hasErrors={ disableSave }
                            minSelections={ minSelections }
                            resetLinkText={ resetLinkText }
                            selectInstructions={ selectInstructions }
                            totalCount={ totalCount }
                        />

                        <div className="section-save-button list">

                            <ButtonBar justify="right">
                                <Button
                                    disabled={ disableSave }
                                    onClick={ () => handleSave() }
                                >
                                    Save
                                </Button>
                            </ButtonBar>

                        </div>

                    </Fragment>

                }

            </FormPanel>

        </section>
    )
}

TogglePanelCheckbox.propTypes = {
    /** List array that includes label, enabled, and required values */
    listItems: PropTypes.array.isRequired,
    /** Minimum number of checkboxes that must be selected in order to save */
    minSelections: PropTypes.number,
    /** Sets title of the toggle panel. Ex: 'Organizations' */
    panelTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    /** List with default values if list should reset to default */
    resetDefaultList: PropTypes.array,
    /** Sets reset link text. Defaults to 'Reset Selections' */
    resetLinkText: PropTypes.string,
    /** Function to handle save */
    save: PropTypes.func.isRequired,
    /** Sets instructions for edit screen. Ex: 'Select Organizations from the list below.' */
    selectInstructions: PropTypes.string.isRequired,
    /** Shows counter in view panel. Defaults to false. */
    viewCounter: PropTypes.bool
}

export default TogglePanelCheckbox
