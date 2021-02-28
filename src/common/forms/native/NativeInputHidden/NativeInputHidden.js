import React from 'react'

const NativeInputHidden = ({
    name,
    id,
    value = ''
}) => {

    const optionalId = (id) ? { id } : ''

    return (
        <div className="input-hidden" { ...optionalId }>
            <input
                type="hidden"
                name={ name }
                value={ value }
            />
        </div>
    )

}

export default NativeInputHidden
