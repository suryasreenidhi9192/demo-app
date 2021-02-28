```js
const handleChange = () => {console.log('handle')};
const listItems = [
    { enabled: true, label: 'Batman', required: true },
    { enabled: false, label: 'Antman', required: false },
    { enabled: true, label: 'Superman', required: true },
    { enabled: false, label: 'Ironman', required: false },
];
<TogglePanelCheckboxEdit 
    handleChange={ handleChange }
    listItems={ listItems }
    resetDefaultList={ listItems }
    resetLinkText='Reset to default columns'
    selectInstructions='Select Columns from list below.'
    totalCount={ 3 }
/>
```