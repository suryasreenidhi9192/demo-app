## Sample Breakdown Bars Legend and Data Shapes

``` javascript
const legend = [
    {
        color: '#1BB5FE',
        description: 'Population well-controlled or improving',
        data: [
            {
                description: 'Maintained and < 8%',
                name: 'item1',
                value: '+60.4%',
                viewDetailsText: '6,000'
            },
            {
                description: 'Improved and < 8%',
                name: 'item2',
                value: '-16.2%',
                viewDetailsText: '5,000'
            },
            {
                description: 'Improved but ≥ 8%',
                name: 'item3',
                value: '-21.9%',
                viewDetailsText: '4,000'
            }
        ]
    },
    {
        color: '#E9989C',
        description: 'Population regressed or no progress',
        data: [
            {
                description: 'Regressed and ≥ 8%',
                name: 'item4',
                value: '-46.7%',
                viewDetailsText: '4,000'
            },
            {
                description: 'Not improved and ≥ 8%',
                name: 'item5',
                value: '+108.8%',
                viewDetailsText: '1,000'
            }
        ]
    }
];

const data =  [[
        {
            name: 'item1',
            value: 0.35
        },
        {
            name: 'item2',
            value: 0.25
        },
        {
            name: 'item3',
            value: 0.15
        }
    ],
    [
        {
            name: 'item4',
            value: 0.15
        },
        {
            name: 'item5',
            value: 0.10
        }
    ]];


<BreakdownBar data={ data } label='2020' legend={ legend } onViewDetails={ () => {} } />

```