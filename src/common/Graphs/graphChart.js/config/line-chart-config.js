
export const lineChartConfig = {
  type: 'serial',
  dataDateFormat: 'DD-MM-YYYY',
  theme: 'light',
  marginRight: 40,
  marginLeft: 40,
  autoMarginOffset: 20,
  mouseWheelZoomEnabled: true,
  legend: {
    useGraphSettings: true,
    markerSize: 12,
    valueWidth: 0,
    verticalGap: 0
  },
  valueAxes: [{
    id: 'v1',
    axisAlpha: 0,
    position: 'left',
    title: 'UNITS',
    ignoreAxisWidth: true
  },
  {
    id: 'DFE',
    axisAlpha: 0,
    gridAlpha: 0,
    position: 'left',
    title: 'distance'
  }],
  balloon: {
    borderThickness: 1,
    shadowAlpha: 0
  },
  graphs: [{
    id: 'g1',
    balloon: {
      drop: true,
      adjustBorderColor: false,
      color: '#ffffff'
    },
    bullet: 'round',
    bulletBorderAlpha: 1,
    bulletColor: '#FFFFFF',
    bulletSize: 5,
    hideBulletsCount: 50,
    lineThickness: 2,
    title: 'PROMO DFE U',
    useLineColorForBulletBorder: true,
    valueField: 'value',
    balloonText: '<span style="font-size:18px">[[value]]</span>'
  }, {
    id: 'g2',
    balloon: {
      drop: true,
      adjustBorderColor: false,
      color: '#cccccc'
    },
    bullet: 'round',
    bulletBorderAlpha: 1,
    bulletColor: '#CCCCCC',
    bulletSize: 5,
    hideBulletsCount: 50,
    lineThickness: 2,
    title: 'PROMO SALES U',
    useLineColorForBulletBorder: true,
    valueField: 'units',
    balloonText: '<span style="font-size:18px">[[units]]</span>'
  }],
  chartScrollbar: {
    graph: 'g1',
    oppositeAxis: false,
    offset: 30,
    scrollbarHeight: 80,
    backgroundAlpha: 0,
    selectedBackgroundAlpha: 0.1,
    selectedBackgroundColor: '#888888',
    graphFillAlpha: 0,
    graphLineAlpha: 0.5,
    selectedGraphFillAlpha: 0,
    selectedGraphLineAlpha: 1,
    autoGridCount: true,
    color: '#AAAAAA'
  },
  chartCursor: {
    pan: true,
    valueLineEnabled: true,
    valueLineBalloonEnabled: true,
    cursorAlpha: 1,
    cursorColor: '#258cbb',
    limitToGraph: 'g1',
    valueLineAlpha: 0.2,
    valueZoomable: true
  },
  valueScrollbar: {
    oppositeAxis: false,
    offset: 50,
    scrollbarHeight: 10
  },
  categoryField: 'week',
  title: 'DFE units',
  categoryAxis: {
    parseDates: false,
    dashLength: 1,
    minorGridEnabled: true,
    /* istanbul ignore next */
    labelFunction(valueText) {
      if (valueText) {
        return calendarService.getPeriod(valueText);
      }
    }
  },
  dataProvider: '',
  export: {
    enabled: true
  }
};
