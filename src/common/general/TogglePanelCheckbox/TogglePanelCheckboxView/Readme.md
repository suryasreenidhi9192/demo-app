```js
const listItems = [
    { enabled: true, label: 'Batman', required: true },
    { enabled: true, label: 'Antman', required: false }
];
<TogglePanelCheckboxView
    counter= { true }
    selectedCount= { 2 }
    totalCount= { 2 }
    selectedItems= { listItems }
/>
```