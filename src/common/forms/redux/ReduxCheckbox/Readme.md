### Default Usage
```jsx
<form className="form">
    <ReduxCheckbox label="check this out" />
</form>
```

### Disabled Example
This component seems to be missing disabled styling...
```jsx
<form className="form">
    <ReduxCheckbox label="Can't check this" disabled />
</form>
```

### Error Example
This component seems to have no error handling...
*TODO:* Remedy this missing behavior
```jsx
<form className="form">

    <ReduxCheckbox
        label="Checked or unchecked..."
        meta= { {
            touched: true,
            error: 'This field is invalid.'
        } }
    />

</form>
```

### ReduxForms Example
###### Rendering component inside Field
```jsx
const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
const Field = require('redux-form').Field;

<ReduxFormWrapper>

    <Field
        name="testCheck"
        component={ ReduxCheckbox }
        label="Select me"
        onChange={ (...args) => console.log(args) }
    />

</ReduxFormWrapper>
```
