```jsx
    let filter = {
        sortBy: {
            colName: 'Member-Id',
            order: 'asc'
        },
        filterBy : { BookName: 'sold_my_ferrari' },
        page: 1
    };

    <Table
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
        rows= {[
            [ 
                {
                    name: 'Count',
                    raw: '10',
                    display: '10'
                },
                {
                    name: 'BookName',
                    raw: 'chickensoup',
                    display: 'Chicken Soup'
                },
                {
                    name: 'Member-Id',
                    raw: 'ASUUE-098',
                    display: 'ASUUE-098'
                }
            ],
            [ 
                {
                    name: 'Count',
                    raw: '20',
                    display: '20'
                },
                {
                    name: 'BookName',
                    raw: 'sold_my_ferrari',
                    display: 'Sold My Ferrari'
                },
                {
                    name: 'Member-Id',
                    raw: 'ZCTRUE-058',
                    display: 'ZCTRUE-058'
                }
            ]   
        ]}
        errorMessage= ''
        filterValues= { filter }
        isLocalData={ true }
        lodingMessage='Custom Loader'
        maxResults= { 10 }
        onFilterChange= { () => console.log('changed') }
        paging= { true }
        resultsPerPage={ 2 }
        totalResults= { 5 }
    />
```