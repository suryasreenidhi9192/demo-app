### TableFooter
```jsx
    let  pageNo = 1
    const change = (p) => { pageNo = p }
        <TableFooter
            onPageChange= { change }
            page= { pageNo }
            paging= { false }
            resultsPerPage= { 5 }
            totalResults= { 50 }
        />
```
