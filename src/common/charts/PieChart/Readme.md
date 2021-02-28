### Pie Charts
``` javascript
    const donutChartData = [
        {
            color: '#1BB5FE',
            description: 'Maintained and < 8%',
            name: 'maintained',
            percent: 0.4,
            viewDetailsText: '8,000 (40%)'
        },
        {
            color: '#72C0F7',
            description: 'Improved and < 8%',
            name: 'improvedLessThan',
            percent: 0.20,
            viewDetailsText: '4,000 (20%)'
        },
        {
            color: '#ADDDFF',
            description: 'Improved but ≥ 8%',
            name: 'improvedGreaterThan',
            percent: 0.15,
            viewDetailsText: '3,000 (15%)'
        },
        {
            color: '#E9989C',
            description: 'Regressed and ≥ 8%',
            name: 'regressed',
            percent: 0.16,
            viewDetailsText: '3,000 (16%)'
        },
        {
            color: '#E36270',
            description: 'Not improved and ≥ 8%',
            name: 'notImproved',
            percent: 0.09,
            viewDetailsText: '2,000 (9%)'
        }
    ];
    const donutInfo = {
        value: '20,000',
        label: 'Patients'
    };

    <PieChart
        data={ donutChartData }
        donutInfo={ donutInfo }
        selection='notImproved'
        type="donut"
    />
```