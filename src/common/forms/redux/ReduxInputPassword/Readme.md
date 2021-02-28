### Default Usage
```jsx
<form className="form">

    <ReduxInputPassword
        input={{}}
        label="Password"
    />

</form>
```

### Disabled Example
```jsx
<form className="form">

    <ReduxInputPassword
        input={{}}
        label="Disabled Password"
        disabled
    />

</form>
```

### Error Example
```jsx
<form className="form">
    <ReduxInputPassword
        input={{}}
        label="Errored Password"
        meta= { {
            touched: true,
            error:'Your account has been locked.'
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
        name="reduxFormPasswordExample"
        component={ ReduxInputPassword }
        label="Password"
    />

</ReduxFormWrapper>
```

### ReduxForms Example with Rules And Validation
```jsx
const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
const Field = require('redux-form').Field;
const validation = require('../../../../utils/validation').validation;

const validate = React.useCallback(
    (value, allValues) => validation.password(
            value,
            {
                ...allValues,
                firstName:'firstName',
                lastName:'lastName',
                username:'userName',
                emailId:'emailId'
            }),
    []
);

<ReduxFormWrapper>

    <Field
        name="testPasswordValidation"
        component={ ReduxInputPassword }
        label="Password"
        rules="true"
        validate={ validate }
    />

</ReduxFormWrapper>
```
