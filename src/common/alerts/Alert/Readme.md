### Simple Alert
```jsx
    <Alert>Hello Alert</Alert>
```

### Info Alert with Much Copy
```jsx
    <Alert type="info">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</Alert>

```

### Warning Alert with Footer Emoji
```jsx
    <Alert
        type="warning"
        footer="Footer copy 😀 😎 👍 💯"
    >
        Onward and upward, productize the deliverables and focus on the bottom line time to open the kimono loop back, so organic growth, yet we need to crystallize a plan for feature creep shoot me an email.
    </Alert>
```

### Success Alert with Header Emoji
```jsx
    <Alert
        type="success"
    >
        Some text...
    </Alert>
```

### Error Alert with Footer Button
```jsx
    const Button = require('../../buttons/Button').default;
    <Alert
        type="error"
        footer={
                <Button display="secondary">
                    Click Me!
                </Button>
            }
    >
        Not enough bandwidth I just wanted to give you a heads-up cannibalize, or turd polishing. Criticality we don't want to boil the ocean.
    </Alert>
```
