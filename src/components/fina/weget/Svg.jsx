import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Svg extends PureComponent {
  getOption = () => ({
    title: {
      text: 'test'
    },
    tooltip: {},
    legend: {
      data:['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '袜子', '袜子', '袜子']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10,0, 20, 20, 20, 20]
    }]
  })

  render() {

    return (
      <div className='examples'>
        <div className='parent'>
          {/*<label> SVG renderer chart </label>*/}
          <ReactEcharts
            option={this.getOption()}
            style={{height: '400px', width: '100%'}}
            opts={{ renderer: 'svg' }}
            className='react_for_echarts' />
        </div>
      </div>
    );
  }
}
