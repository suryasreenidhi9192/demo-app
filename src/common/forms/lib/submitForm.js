export const submitForm = e => {

    e.preventDefault()

    let valid = true
    const obj = {}

    e.target.forEach((f) => {

        if (f.disabled) return

        if (f.type === 'text' || f.type === 'textarea' || f.type === 'select-one') {

            if (f.getAttribute('data-valid') === 'false') {
                valid = false
                f.focus()
                if (f.type === 'text' || f.type === 'textarea') f.select()
            }

            if (f.getAttribute('data-required') && !f.value.length) {
                valid = false
                f.focus()
                if (f.type === 'text' || f.type === 'textarea') f.select()
            }

            obj[f.name] = f.value

        }

        if (f.type === 'checkbox') {
            obj[f.name] = f.checked
        }

        if (f.type === 'radio' && f.checked) {
            obj[f.name] = f.value
        }

        if (f.type === 'hidden' || f.type === 'password') {
            obj[f.name] = f.value
        }

    })

    return (valid) ? obj : false

}
