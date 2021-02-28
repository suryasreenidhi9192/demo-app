### Useage

``` javascript

const data = [
    {
        color: '#14A4A7',
        name: 'inrange',
        subtitle: '(≤70mg/dl and ≤180mg/dl)',
        title: 'In-range readings',
        value: 2796
    },
    {
        color: '#FFD75E',
        name: 'hyper',
        subtitle: '(>180mg/dl)',
        title: 'Hyperglycemic episodes',
        value: 827
    },
    {
        color: '#DB5899',
        name: 'hypo',
        subtitle: '(<70mg/dl)',
        title: 'Hypoglycemic episodes',
        value: 2327
    }
]

const handleViewDetails = name => {
    alert(name)
}

<PercentageBars data={ data } onViewDetails={ handleViewDetails } total={ 2889 } />

```