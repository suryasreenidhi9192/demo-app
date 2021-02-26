import React from 'react';
import Chart from './graph-chart';
import {shallow, mount} from 'enzyme';

const defaultProps = {
  nodeId: '10',
  week: '20181102'
};

const chartData = [
  {
    week: 20180901,
    units: 10,
    value: 1000
  },
  {
    week: 20180903,
    units: 20,
    value: 500
  }
];

describe('<Chart />', () => {
  test('renders without error', () => {
    const wrapper = shallow(<Chart {...defaultProps}/>);
    expect(wrapper.state().loadingData).toBe(true);
  });

  test('sets graphs correctly when data provided', () => {
    const wrapper = mount(<Chart {...defaultProps}/>);
    expect(wrapper.state().loadingData).toBe(true);
    wrapper.setState({
      dataProvider: chartData,
      loadingData: false
    });
    wrapper.update();
    expect(wrapper.state().loadingData).toBe(false);
  });
});

