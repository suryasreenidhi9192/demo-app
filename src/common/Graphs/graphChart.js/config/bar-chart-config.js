import calendarService from '../../utils/calendar-service/calendar-service';

export const barChartConfig = {
  type: 'serial',
  theme: 'light',
  marginRight: 70,
  handDrawn: true,
  handDrawScatter: 3,
  legend: {
    useGraphSettings: true,
    markerSize: 12,
    valueWidth: 0,
    verticalGap: 0
  },
  dataProvider: '',
  valueAxes: [{
    minorGridAlpha: 0.08,
    minorGridEnabled: true,
    position: 'left',
    title: 'UNITS',
    axisAlpha: 0
  }],
  startDuration: 1,
  graphs: [{
    id: 'g1',
    balloonText: '<span style="font-size:13px">[[title]] in [[category]]:<b>[[value]]</b></span>',
    title: 'PROMO DFE U',
    type: 'column',
    fillAlphas: 0.8,
    valueField: 'value'
  }, {
    id: 'g2',
    balloonText: '<span style="font-size:13px">[[title]] in [[category]]:<b>[[value]]</b></span>',
    title: 'PROMO SALES U',
    type: 'column',
    fillAlphas: 0.8,
    valueField: 'units'
  }],
  rotate: true,
  categoryField: 'week',
  categoryAxis: {
    gridPosition: 'start',
    /* istanbul ignore next */
    labelFunction(valueText) {
      if (valueText) {
        return calendarService.getPeriod(valueText);
      }
    }
  },
  export: {
    enabled: true
  }
};
