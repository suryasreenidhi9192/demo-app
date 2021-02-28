```js
const [ comparisonType, setComparisonType ] = React.useState('tab1');
const tabs = [
        { label: 'Tab1', name: 'tab1' },
        { label: 'Tab2', name: 'tab2' }
    ];
handleSelect = (selected) => setComparisonType(selected);

<ToggleTabs
    selectedTab={ comparisonType }
    onSelect= { handleSelect } 
    tabs={ tabs }
/>
```