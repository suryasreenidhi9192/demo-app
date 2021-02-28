### Multiple Checkboxes
```jsx

    const Checkbox = require('./Checkbox').default;

    const cls = 'sel';

    <Checkboxes id='group'>
        <Checkbox
            name="check me once"
            value="checks"
            cls={cls}
            cb={(e) => {
               e.currentTarget.classList.toggle('sel')
            }}
        />
         <Checkbox
            name="check me twice"
            value="checks"
            cls={cls}
            cb={(e) => {
                e.currentTarget.classList.toggle('sel')
            }}
        />
    </Checkboxes>
```