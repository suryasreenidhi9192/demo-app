### Checkbox
```jsx
   
    const cls = 'sel';

    <Checkbox
        key="checks"
        name="check me"
        cls={ cls }
        cb={ (e) => {
            e.currentTarget.classList.toggle('sel')
        }}
    />
```
