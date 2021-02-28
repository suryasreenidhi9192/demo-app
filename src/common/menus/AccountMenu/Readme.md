### Single Account Menu
```jsx

const MemoryRouter = require('react-router').MemoryRouter;
<MemoryRouter>
    <AccountMenu
        firstName="First Name" 
        lastName="Last Name"
        menuItems={[
            {
                href: 'Link', 
                label: 'First Menu'
            }
        ]}
    />
</MemoryRouter>

```
### Multiple Account Menu
```jsx

const MemoryRouter = require('react-router').MemoryRouter;
<MemoryRouter>
    <AccountMenu
        firstName="First Name" 
        lastName="Last Name"
        menuItems={[
            {
                href: 'Link1', 
                label: 'First Menu'
            },
            {
                href: 'Link2',
                label:'Second Menu'
            }
        ]}
    />
</MemoryRouter>

```
