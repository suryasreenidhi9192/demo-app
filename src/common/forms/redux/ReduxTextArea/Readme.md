### Default Example
```jsx
<form className="form">

    <ReduxTextArea
        label="Type some words"
    />

</form>
```

### Disabled Example
```jsx
<form className="form">

    <ReduxTextArea
        disabled
        label="Type some words... If you can"
    />

</form>
```

### Error Example
```jsx
<form className="form">

    <ReduxTextArea
        meta={{
            touched: true,
            error: 'This is not right.'
        }}
        label="Type some words... If you can"
    />

</form>
```

### ReduxForms Example with Validation
```jsx
const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
const Field = require('redux-form').Field;

// const validate = useCallback((value, allValues) => `${ value }: won't validate.`, [])

<ReduxFormWrapper>

    <Field
        name="testTextAreaValidation"
        component={ ReduxTextArea }
        label="You can type it... "
        onChange={ (...args) => console.log(args) }
        // validate={[ validate ]}
    />

</ReduxFormWrapper>
```
