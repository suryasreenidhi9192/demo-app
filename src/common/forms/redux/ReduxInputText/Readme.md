### Default Usage
```jsx
<form className="form">

    <ReduxInputText
        label="Type some words"
    />

</form>
```

### Disabled Example
```jsx
<form className="form">

    <ReduxInputText
        label="Type some words"
        disabled
    />

</form>
```

### Error Example
```jsx
<form className="form">

    <ReduxInputText
        label="Type some words"
        meta= { {
            touched: true,
            error: 'This field is invalid.'
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
        name="testText"
        component={ ReduxInputText }
        label="Type some words"
        onChange={ (...args) => console.log(args) }
    />

</ReduxFormWrapper>
```
### ReduxForms Example with Invalidation
Valitation won't work here without an initial value being set. (ReduxForms requires the `InitialValues` prop to be set on the wrapping field to do this.)

```jsx
const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
const Field = require('redux-form').Field;

const validate = React.useCallback((value, allValues) => `${ value }: won't validate.`, []);

<ReduxFormWrapper>

    <Field
        name="testTextValidation"
        component={ ReduxInputText }
        label="You can type it... "
        onChange={ (...args) => console.log(args) }
        validate={ validate }
    />

</ReduxFormWrapper>
```
