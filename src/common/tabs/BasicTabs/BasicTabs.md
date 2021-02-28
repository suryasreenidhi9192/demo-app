### Default Usage
```jsx
const BasicTab = require('./BasicTab').default;

<BasicTabs selectedTab="tab2">
    <BasicTab
        name="tab1"
        label="Tab 1"
    >
        <div>
            Tab 1: Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
        </div>
    </BasicTab>
    <BasicTab
        name="tab2"
        label="Tab 2"
    >
        <div>
            Tab 2: Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.
        </div>
    </BasicTab>
</BasicTabs>
```
### Default Usage Without `<BasicTab />` Component
Not recommended because these are not standard props of `div`, but meant to illustrate that the `Tab` Component is quite simple to overwrite for more complex UIs...

``` jsx
<BasicTabs selectedTab="div1">

        <div name="div1" label="Div 1">
            Tab 1: Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
        </div>

        <div name="div2" label="Div 2">
            Tab 2: Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.
        </div>
</BasicTabs>
```

