### Basic Table component 
```jsx
   
    <TableBasic
        columns= {[
            {
                name: 'Count',
                type: 'number'
            },
            {
                name: 'BookName',
                type: 'string'
            },
            {
                name: 'Member-Id',
                type: 'code'
            },
        ]}
        rows= {[
            [ 
                10,
                'Chicken Soup',
                'ASUUE-098'
            ],
            [ 
                20,
                'Sold My Ferrari',
                'ZCTRUE-058'
            ]   
        ]}
    />
```