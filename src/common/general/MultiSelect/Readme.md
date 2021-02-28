### MultiSelect
```jsx
    let selected = [];
    const handleChange = (item) => selected.push(item);
    <MultiSelect 
        label='Characters'
        name='DC'
        onChange= { handleChange }
        options= {[
            {label: 'Green', value: 'green'},
            {label: 'Black', value: 'black'}
        ]}
        selectedItems={selected}
    />
```
