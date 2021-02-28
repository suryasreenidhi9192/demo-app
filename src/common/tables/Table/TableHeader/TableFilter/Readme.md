### TableFilter
```jsx
let columnValue = {
            name: 'Count',
            label: 'Count',
            type: 'number',
            filterType: 'select',
            filterOperator: 'Range',
            filterValue: 5,
            selectOptions:[
                {
                    label: '0 to 10',
                    value: '0,10'
                },
                {
                    label: 'More than 10',
                    value: '10,99'
                },
            ]
        };
    <TableFilter
        column= { columnValue }
        isEnabled= { true }
        isLocalData= { true }
        onChange= { (e) => console.log('Changed') }
    />
```