import React, {Component} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import {lineChartConfig} from './line-chart-config';
import {barChartConfig} from './bar-chart-config';

import {
  organizeGridData
} from '../../utils/grid-helper/grid-helper';

const Styles = styled.div`

  .App {
    width: 100%;
    height: 100%;
  }
`;

// Component which contains the dynamic state for the chart
class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvider: [],
      timer: null,
      loadingData: true
    };
  }

  componentDidMount() {
    this.generateData();
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  /* istanbul ignore next */
  async generateData() {
    const {nodeId, week} = this.props;
    const weeks = calendarService.getCalendarRolloverRange(week);
    const {startWeek, endWeek, gridStartWeek} = weeks;
    this.gridStartWeek = gridStartWeek;
    const nodeData = await ufpService.getCalendar(nodeId, startWeek, endWeek, week);
    const organizedData = organizeGridData(nodeData, week, weeks);
    const data = _.sortBy(organizedData, 'week');
    const dataProvider = data.map(item => {
      return {
        week: parseInt(item.week, 10),
        units: item.metrics.digitalPromoUnits,
        value: item.metrics.digitalPromoDfe
      };
    });
    this.setState({
      dataProvider,
      loadingData: false
    }, () => {
      this.loadChart();
    });
  }

  Chart = null;

  /* istanbul ignore next */
  loadChart() {
    lineChartConfig.dataProvider = this.state.dataProvider.slice(0, 10);
    barChartConfig.dataProvider = this.state.dataProvider.slice(0, 5);
    // eslint-disable-next-line no-undef
    this.lineChart = AmCharts.makeChart('lineChartConfig', lineChartConfig);
    // eslint-disable-next-line no-undef
    this.barChart = AmCharts.makeChart('barChartConfig', barChartConfig);
  }

  render() {
    if (this.state.loadingData) {
      return <p>loading...</p>;
    }
    return (
      <Styles>
        <div className="App">
          <div style={{width: '100%', height: '500px'}} id="lineChartConfig"/>
          <div style={{width: '100%', height: '500px'}} id="barChartConfig"/>
        </div>
      </Styles>
    );
  }
}

export default Chart;
