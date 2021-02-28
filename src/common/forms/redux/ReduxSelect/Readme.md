### Default Example
```jsx
<form className="form">

    <ReduxSelect
        label="Which character would you choose?"
        options={[
            { label: 'Luke Skywalker', value: 'sheep'},
            { label: 'Batman', value: 'slacker'},
            { label: 'Hiro Protagonist', value:'well read slacker'}
        ]}
    />

</form>
```

### Disabled Example
```jsx
<form className="form">

    <ReduxSelect
        disabled
        label="Which character would you choose?"
        options={[
            { label: 'Luke Skywalker', value: 'sheep'},
            { label: 'Batman', value: 'slacker'},
            { label: 'Hiro Protagonist', value:'well read slacker'}
        ]}
    />

</form>
```

### Error Example
```jsx
<form className="form">

    <ReduxSelect
        meta ={ {
            touched: true,
            error: 'This started off bad...'
        } }
        label="Which character would you choose?"
        options={[
            { label: 'Luke Skywalker', value: 'sheep'},
            { label: 'Batman', value: 'slacker'},
            { label: 'Hiro Protagonist', value:'well read slacker'}
        ]}
    />

</form>
```

### ReduxForms Example with Validation
Valitation won't work here without an initial label being set. (ReduxForms requires the `InitialValues` prop to be set on the wrapping field to do this.)
```jsx
const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
const Field = require('redux-form').Field;

// const validate = useCallback((value) => 'this will always fail', []);

<ReduxFormWrapper>

    <Field
        name="selectCharacter"
        component={ ReduxSelect }
        label="Which character would you choose?"
        options={ [
            { label: 'Luke Skywalker', value: 'sheep'},
            { label: 'Batman', value: 'slacker'},
            { label: 'Hiro Protagonist', value:'well read slacker'}
        ] }
        // validate={ validate }
    />

</ReduxFormWrapper>
```
