/**
 * Created by hao.cheng on 2017/5/5.
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

const option = {
    title: {
        text: '趋势图'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['入金','出金','佣金']
    },
    toolbox: {
        // feature: {
        //     saveAsImage: {}
        // }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            name: '日期',
            type : 'category',
            boundaryGap : false,
            data : ['0101','0102','0103','0306','0307','0309','0405']
        }
    ],
    yAxis : [
        {
            name: '$/美金',
            type : 'value'
        }
    ],
    series : [
        {
            name:'入金',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'出金',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'佣金',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410]
        }
    ]
};

const EchartsViews = () => (
    <ReactEcharts
        option={option}

        style={{height: '350px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsViews;