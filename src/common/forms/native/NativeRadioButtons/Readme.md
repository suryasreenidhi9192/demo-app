### NativeRadioButtons
```jsx

    handleSelect = (event) => {
        const form = document.forms['native-radio']
        const elements = form.querySelectorAll('input')
        elements.forEach( el => {
            el.checked = event.target.value === el.value
        })
    }

    <form id='native-radio'>
        <NativeRadioButtons
            options={[
                {key: 'R1', value: 'Radio 1', label: 'Radio One'},
                {key: 'R2', value: 'Radio 2', label: 'Radio Two'},
                {key: 'Ra', value: 'Radio a', label: 'Radio Alpha'},
                {key: 'Rb', value: 'Radio b', label: 'Radio Beta'}
            ]}
            selected= { 'Radio 1' }
            onClick={ handleSelect }
        />
    </form>
```

### Disabled NativeRadioButtons
```jsx
    <NativeRadioButtons
        options={[
            {key: 'R3', value: 'Radio 3', label: 'Radio Three'},
            {key: 'R4', value: 'Radio 4', label: 'Radio Four'}
        ]}
        selected='Radio 3'
        disabled
    />
```