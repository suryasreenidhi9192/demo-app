### FormField - Native Text
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
    <ReduxFormWrapper>
        <FormField type='nativeText' name='username' label='UserName' />  
    </ReduxFormWrapper> 
```

### FormField - Checkbox
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
    <ReduxFormWrapper>
        <FormField type='checkbox' name='checkme' label='Check Me' />   
    </ReduxFormWrapper>    
```

### FormField - Date
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
    <ReduxFormWrapper>
        <FormField type='date' name='date' label='Select the date' />   
    </ReduxFormWrapper>    
```

### FormField - Password
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
    <ReduxFormWrapper>
        <FormField type='password' name='password' label='Password' />      
    </ReduxFormWrapper> 
```

### FormField - Text
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
    <ReduxFormWrapper>
        <FormField type='text' name='text' label='Text here' />      
    </ReduxFormWrapper> 
```

### FormField - Radio
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
    <ReduxFormWrapper>
        <FormField 
            type='radio'
            name="defaultCharacter"
            label="Which character would you choose?"
            options={[
                { label: 'Luke Skywalker', value: 'sheep'},
                { label: 'Batman', value: 'slacker'},
                { label: 'Hiro Protagonist', value:'well read slacker'}
            ]}
        />   
    </ReduxFormWrapper>  
```

### FormField - Select
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
    <ReduxFormWrapper>
        <FormField 
        name='select your fav'
        type='select' 
        label="Which character would you choose?"
        options={[
            { label: 'Luke Skywalker', value: 'sheep'},
            { label: 'Batman', value: 'slacker'},
            { label: 'Hiro Protagonist', value:'well read slacker'}
        ]}
        />    
    </ReduxFormWrapper>   
```

### FormField - Text Area
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
    <ReduxFormWrapper>
        <FormField type='textarea'  name='text area' label='text area' />   
    </ReduxFormWrapper>    
```
