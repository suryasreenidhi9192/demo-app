import React from 'react'
import { connect, useDispatch } from 'react-redux'
// import { saveFormData } from 'app/Global/actions'
import { submitForm } from '../lib'

const FormNew = ({
    name,
    handleSubmit,
    children
}) => {

    const dispatch = useDispatch()

    const saveForm = (e) => {

        const form = e.target
        const obj = submitForm(e)

        if (obj) {

            // dispatch(saveFormData(obj, dispatch))

            setTimeout(() => {
                handleSubmit(form)
            }, (0))

        }

    }

    return (
        <form name={ name } className="form" onSubmit={ saveForm }>
            { children }
        </form>
    )

}

export default connect(null, null)(FormNew)
