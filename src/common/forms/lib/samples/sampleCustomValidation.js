export const handleCustomValidation = (e) => {

    const el = e.target
    const form = (el.form)

    const el1 = form.custom1
    const el2 = form.custom2
    const id1 = document.getElementById(el1.name)
    const id2 = document.getElementById(el2.name)

    const errorMessage = (el1.name + ' value should be greater than ' + el2.name)

    if (el1.value === '') return errorMessage
    if (el2.value === '') return errorMessage

    if (el2.value > el1.value) {
        el1.setAttribute('data-valid', false)
        el2.setAttribute('data-valid', false)
        id1.classList.add('err')
        id2.classList.add('err')
        return errorMessage
    } else {
        el1.setAttribute('data-valid', true)
        el2.setAttribute('data-valid', true)
        id1.classList.remove('err')
        id2.classList.remove('err')
        return false
    }

}
