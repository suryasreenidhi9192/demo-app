export const curryWithPressed = cb => e => {
    const el = e.target
    el.classList.add('pressed')
    const x = (el) => el.classList.remove('pressed')
    setTimeout(() => x(el), 200)
    if (!cb) return
    e.preventDefault()
    cb(e)
}

export const curryWithPreventDefault = cb => e => {
    e.preventDefault()
    if (typeof cb === 'function') {
        cb(e)
    }
}

export const curryWithEnterKeyPress = (onClick) => ({ key }) => {
    if (key === 'Enter') { 
        onClick(); 
    }
};
