```js
const handleSave = () => console.log('save')
const listItems = [
    { enabled: true, label: 'Batman', required: true },
    { enabled: true, label: 'Antman', required: false },
    { enabled: false, label: 'Superman', required: true }
];
<TogglePanelCheckbox
    
    listItems= { listItems }
    minSelections= { 2 }
    panelTitle= 'Hero'
    resetDefaultList={ listItems }
    resetLinkText='Reset to default columns'
    selectInstructions='Select Columns from list below.'
    save= { handleSave }
    viewCounter= { true }
/>
```