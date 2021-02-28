### SectionHeader
```jsx
    const customActions = [
        { onClick: cb, isDisabled: false, label: 'Check', isHidden: false },
        { onClick: cb, isDisabled: true, label: 'Explore', isHidden: false },
        { onClick: cb, isDisabled: true, label: 'Destroy', isHidden: true }
    ];
    const cb = () => console.log('clicked');
    <SectionHeader
        actions = { customActions }
        subtitle = 'Multi Verse'
        title = 'Universe'
    />
```
