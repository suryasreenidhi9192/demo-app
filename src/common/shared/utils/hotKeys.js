const hotKeys = () => {

    document.body.addEventListener('keydown', event => {
        if (event.key === 'Tab') { document.body.setAttribute('data-input', 'keyboard') }

        if (event.ctrlKey && event.shiftKey) {
            const value = parseInt(getComputedStyle(document.body).getPropertyValue('--brand'), 0)
            const valueDown = value - 5 >= 0 ? value - 5 : 355
            const valueUp = value + 5 <= 360 ? value + 5 : 5

            switch (event.key) {
                case 'ArrowUp':
                    document.body.setAttribute('data-theme', 'light')
                    break
                case 'ArrowDown':
                    document.body.setAttribute('data-theme', 'dark')
                    break
                case 'ArrowLeft':
                    document.body.style.setProperty('--brand', valueDown)
                    break
                case 'ArrowRight':
                    document.body.style.setProperty('--brand', valueUp)
                    break
                default:
            }
        }
    })

    document.body.addEventListener('mousedown', () => {
        document.body.setAttribute('data-input', 'mouse')
    })

}

export default hotKeys
