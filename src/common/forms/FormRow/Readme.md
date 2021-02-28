### Form Row
```jsx
const ReduxFormWrapper = require('../../../styleguide/ReduxFormWrapper').default;
import FieldSet from '../FieldSet';
import FormField from '../FormField';

    <FieldSet>
    <FormRow col="4">
        <ReduxFormWrapper>
            <FormField type='nativeText' label='Child 1' name='Child1'  />   
        </ReduxFormWrapper> 
    </FormRow>
    <FormRow col="2">
        <ReduxFormWrapper>
            <FormField type='nativeText' label='Child 2' name='Child2' />  
        </ReduxFormWrapper> 
        <ReduxFormWrapper>
            <FormField type='nativeText' label='Child 3' name='Child3' />  
        </ReduxFormWrapper> 
    </FormRow>
    </FieldSet>   
```
