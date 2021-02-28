###  AdherenceBar Charts
``` javascript
    const adherenceData = [
        {
            code: 'HCCC',
            description: 'HCCC Description',
            adherent: 400,
            adherentPercent: 40,
            nonAdherent: 600,
            nonAdherentPercent: 60
        },
        {
            code: 'HCDB',
            description: 'HCDB Description',
            adherent: 3400,
            adherentPercent: 85,
            nonAdherent: 600,
            nonAdherentPercent: 15
        },
        {
            code: 'HCIM',
            description: 'HCIM Description',
            adherent: 4000,
            adherentPercent: 100,
            nonAdherent: 0,
            nonAdherentPercent: 0
        },
        {
            code: 'HCHV',
            description: 'HCHV Description',
            adherent: 2300,
            adherentPercent: 57,
            nonAdherent: 1700,
            nonAdherentPercent: 42
        }
    ];

    <AdherenceBars
        data={ adherenceData }
        onViewDetails={ () => {} }
    />
```