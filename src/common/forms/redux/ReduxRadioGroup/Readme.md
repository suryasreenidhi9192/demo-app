### Default Example
This component was designed to work with ReduxForms below is a vanilla implementation. Note that without ReduxForms `input` parameter, Input events and validation etc. will not work. This is NOT a standard implementation and should be refactored if that is required int he future...
```jsx
    <form className="form">
        <ReduxRadioGroup
            name="defaultCharacterChoice"
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
        <ReduxRadioGroup
            name="disabledCharacterChoice"
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
In order to load with the error in place, pass the `meta.error` prop for the message. When using this without ReduxForms also pass the `invalid` prop. ReduxForms should handle `meta` for marking in ReduxForms usage.
```jsx
    <form className="form">
        <ReduxRadioGroup
            name="errorCharacterChoice"
            label="Which character would you choose?"
            invalid
            meta ={ {
                error: 'This started off bad...'
            } }
            options={[
                { label: 'Luke Skywalker', value: 'sheep'},
                { label: 'Batman', value: 'slacker'},
                { label: 'Hiro Protagonist', value:'well read slacker'}
            ]}
        />
    </form>
```

### Default Value Example
In order to load with a selected radio label, add the `default` value to the option object in the `options` prop's array label.
```jsx
    <form className="form">
        <ReduxRadioGroup
            name="defaultValueCharacterChoice"
            label="Which character would you choose?"
            options={[
                { label: 'Luke Skywalker', value: 'sheep'},
                { label: 'Batman', value: 'slacker', default: true},
                { label: 'Hiro Protagonist', value:'well read slacker'}
            ]}
        />
    </form>
```

### ReduxForms Usage with Multiple Options
The ReduxForms implementation of the above. *Note:* that the actual examples for the remaining code samples is the `<Field />` Component.
```jsx
    const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
    const Field = require('redux-form').Field;

    // const validate = useCallback((value) => !value, []);

    <ReduxFormWrapper>

        <Field
            component={ ReduxRadioGroup }
            label="Which character would you choose?"
            name="characterChoice"
            options={ [
                { label: 'Luke Skywalker', value: 'sheep'},
                { label: 'Batman', value: 'slacker'},
                { label: 'Hiro Protagonist', value:'well read slacker'}
            ] }
            // validate={ validate }
        />

    </ReduxFormWrapper>
```

### ReduxForms Inline Example with Multiple Options
the `inline` prop provides a styling shortcut to display the buttons inline.
*Note:* that in place of the `inline` prop, you can pass the `radio-inline` className.
```jsx
    const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
    const Field = require('redux-form').Field;

    // const validate = useCallback((value) => !value, []);

    <ReduxFormWrapper>

        <Field
            component={ ReduxRadioGroup }
            inline
            inline={true}
            label="Which character would you choose?"
            name="userCharacterPreferences"
            onChange={ (...args) => console.log(...args) }
            options={ [
                { label: 'Luke Skywalker', value: 'sheep'},
                { label: 'Batman', value: 'slacker'},
                { label: 'Hiro Protagonist', value:'well read slacker'}
            ] }
            // validate={ validate }
        />

    </ReduxFormWrapper>
```

### ReduxForms Examples with a Single Option
The className `right-button` will place the replacement radio button on the right of the control.
```jsx
    const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
    const Field = require('redux-form').Field;

    // const validate = useCallback((value) => !value, []);

    <ReduxFormWrapper>

        <Field
            component={ ReduxRadioGroup }
            inline
            key="warningAbator1"
            label="Are you Left?"
            name="userDown"
            onChange={ (...args) => console.log(...args) }
            options={ [
                { label: 'true', value: 'yes'},
            ] }
            // validate={ validate }
        />
        <br />
        <Field
            className="right-button"
            component={ ReduxRadioGroup }
            inline
            key="warningAbator2"
            label="Are you Right?"
            name="userRightDown"
            onChange={ (...args) => console.log(...args) }
            options={ [
                { label: 'true', value: 'yes'},
            ] }
            // validate={ validate }
        />

    </ReduxFormWrapper>
```


### ReduxForms Validation Example with multiple options
An example to illustrate how highlighting works with multiple elements. Click it and blur focus to see invalidation in action (redux form validation is triggered `onBlur`).
```jsx
    const ReduxFormWrapper = require('../../../../styleguide/ReduxFormWrapper').default
    const Field = require('redux-form').Field;

    // const validate = useCallback((value) => 'this will always fail', []);

    <ReduxFormWrapper>

        <Field
            className="right-button"
            component={ ReduxRadioGroup }
            inline
            label="Which character would you choose?"
            name="userMultiInvalidDown"
            onChange={ (...args) => console.log(...args) }
            options={ [
                { label: 'Batman', value: 'slacker'},
                { label: 'Luke Skywalker', value: 'sheep'},
                { label: 'Hiro Protagonist', value:'well read slacker'}
            ] }
            // validate={ [validate] }
        />

    </ReduxFormWrapper>
```
