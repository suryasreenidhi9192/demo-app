### TableHeader
```jsx
let filterBy = { filterBy: { 'Member-Id': 'ASOP456D-90'} };
<table>
    <TableHeader
        columns= {[
                {
                    name: 'Count',
                    label: 'Count',
                    type: 'number',
                    filterType: 'select',
                    filterOperator: 'Range',
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
                },
                 {
                    name: 'BookName',
                    label: 'Book Name',
                    type: 'string',
                    filter: true
                },
                {
                    name: 'Member-Id',
                    label: 'Member ID',
                    type: 'code',
                    filter: false
                },
            ]}
        filterValues= { filterBy }
        isLocalData= { true }
        onFilterChange= { (e) => console.log('Changed') }
        totalResults= { 50 }
    />
    </table>
```