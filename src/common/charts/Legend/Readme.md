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

    <Legend
        data={ lineChartData }
        onViewDetails={ () => {} }
        type="value"
    />
```