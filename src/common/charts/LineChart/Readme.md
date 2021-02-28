# Line Chart

The LineChart component is an SVG-generating component used to render single-line or multi-line charts based on
numerical values.


## Chart Types

The line chart can be set via the type prop to 'number' (default), 'currency', or 'perecent'.


## Sizing The Chart

The LineChart by default is a 400 width x 200 height viewbox, and the fonts, lines, points and legends will all scale
automatically according to the width. These may be adjusted via props or CSS.


## Shaping Data

### Important Data Shapes:

dataObject = {              // * used to create the data points that are connected to form the line
    hoverText: string,      //   shows when the data point is hovered
    onClick: function,      //   is triggered when data point is clicked
    value: number           // * data point value
}

labelObject = {             //   used to create the X axis labels
    align: string,          //   where the X label sits in accordance to its line ('start' | 'middle' | 'end')
    text: string            //   bottom label text
}

legendObject = {            //   should be provided with multi-line charts, but optional for single-line
    className: string,      //   className assigned to the corresponding line's legend key
    label: string,          //   the corresponding line's display name (default is "Line {index}")
    lineColor: string,      //   the color of the line and its legend key (defaults are provided)
    pointColor: string      //   the color of the line's hoverable/clickable data point (defaults are provided)
}

### Single-line Chart Data Shape (1 line with 3 points)

data = [ dataObject1, dataObject2, dataObject3 ]

labels = [ labelForPoint1, labelForPoint2, labelForPoint3 ]


### Multi-line Chart Data Shape (4 lines with 3 points)

data = [
    [ dataObject1, dataObject2, dataObject3 ], // Line 1
    [ dataObject1, dataObject2, dataObject3 ], // Line 2
    [ dataObject1, dataObject2, dataObject3 ], // Line 3
    [ dataObject1, dataObject2, dataObject3 ]  // Line 4
]

labels = [ labelObjectForPoint1, labelObjectForPoint2, labelObjectForPoint3 ]

legends = [ legendObjectForLine1, legendObjectForLine2, legendObjectForLine3, legendObjectForLine4 ]


``` javascript

    const generateMockData = (numberOfMonths, min, max) => {
        return new Array(numberOfMonths).fill(0).map((_, index) => {

            const value = parseFloat((Math.random() * (max - min) + min).toFixed(4))
            return {
                hoverText: `Month ${index}: ${value * 100}%`,
                value
            }
        })
    };
    
    const lineChartData = [
        {
            color: '#14A4A7',
            data: generateMockData(12, 0.3, 0.5),
            description: 'In-range readings improvement',
            name: 'readings',
            value: '+9.8%'
        },
        {
            color: '#FFD75E',
            data: generateMockData(12, 0.1, 0.4),
            description: 'Hyperglyemic episodes improvement',
            name: 'hyper',
            value: '-27.1%'
        },
        {
            color: '#DB5899',
            data: generateMockData(12, 0.5, 0.8),
            description: 'Hypoglyemic episodes improvement',
            name: 'hypo',
            value: '+11.2%'
        }
    ];

    const lineChartLabels = [
        { align: 'start', text: '12/24/2019' },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        { align: 'end', text: '12/31/2020' }
    ];

    <LineChart
        data={ lineChartData }
        dataGapLabel='Gaps'
        dataType='percent'
        decimalPlaces= {1}
        labels= { lineChartLabels }
    />
```