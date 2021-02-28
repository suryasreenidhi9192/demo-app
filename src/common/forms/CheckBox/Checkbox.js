import React from 'react'
import PropTypes from 'prop-types'

import './Checkbox.scss'


/**
 * @public
 * Builds Checkbox to present the user with a range of options, 
 from which the user may select any number of options to complete their task.
 * @param {String}      params.name     Defines the name of the checkbox
 * @param {String}      params.value    Defines the value of the checkbox
 * @param {String}      params.cls      Defines the class of the checkbox
 * @param {Function}    params.cb       callback function on the target while pressed
*/

const Checkbox = ({
    name,
    value,
    cls,
    cb
}) => {

    const className = 'checkbox ' + cls
    const dataName = !!value ? value : name
    const isDisabled = className.includes('disabled')
    const handleSelect = isDisabled ? (e) => e.preventDefault() : cb

    return (

        <div data-name={ dataName } className={ className } onClick={ handleSelect }>
            <ol>
                <li />
                <li>{ name }</li>
            </ol>
        </div>

    )

}

Checkbox.propTypes = {
    /** Defines the name of the checkbox */
    name: PropTypes.string,
    /** Defines the value of the checkbox */
    value: PropTypes.string,
    /** Defines the class of the checkbox */
    cls: PropTypes.string,
    /** callback function on the target while pressed  */
    cb: PropTypes.func
}

export default Checkbox
