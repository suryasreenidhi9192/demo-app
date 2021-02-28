### Default Usage
```jsx
const [date, setDate] = React.useState('')
const changeHandler = (d) => {
    console.log(d) 
    setDate(d) 
};
const customInput = { 
    value: date,
    onChange: changeHandler 
};
<form className="form">
    <ReduxInputDate 
        label="Select A Date" 
        input= { customInput }
    />
</form>
```

### Disabled example
```jsx
<form className="form">
    <ReduxInputDate
        label="Time Does Not Belong To You."
        disabled
    />
</form>
```

### Error example
```jsx
<form className="form">
    <ReduxInputDate
        label="Select a Date"
        meta= { {
            touched: true,
            error: 'Time Is Irrelevant.'
        } }
    />
</form>
```

### ReduxForms Example
```jsx
const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
const Field = require('redux-form').Field;

<ReduxFormWrapper>

    <Field
        name="testCheck"
        component={ ReduxInputDate }
        label="Select me"
        onChange={ (...args) => console.log(args) }
    />

</ReduxFormWrapper>
```
