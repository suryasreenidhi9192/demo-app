### TableAlert for Error
```jsx
    <table>
        <TableAlert
            columns= {['Col-A','Col-B','Col-C']}
            errorMessage= 'An unexpected error occurred. Please try again.'
            maxResults= {10}
            totalResults= {20}
        />
    </table>
```
### TableAlert for 0 results
```jsx
    <table>
        <TableAlert
            columns= {['Col-A','Col-B','Col-C']}
            errorMessage= ''
            maxResults= {10}
            totalResults= {0}
        />
    </table>
```

### TableAlert for warning
```jsx
    <table>
        <TableAlert
            columns= {['Col-A','Col-B','Col-C']}
            errorMessage= ''
            maxResults= {10}
            totalResults= {20}
        />
    </table>
```