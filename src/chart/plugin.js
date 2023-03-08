import { Chart } from "chart.js";

const image = new Image();
image.src = 'https://www.chartjs.org/img/chartjs-logo.svg';

export const plugin = {
    datalabels: {
        color: 'white',
        font: {
            weight: 'bold'
        },
        formatter: function(value, context) {
            if(context.datasetIndex === 0){
                const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
                return context.chart.data.labels[labelIndex];
            }else{
                let indexPositionCalc = 0;
                for (let index = 0; index < context.datasetIndex; index++) {
                    indexPositionCalc += context.chart.data.datasets[index].data.length;
                }
                const labelIndex = indexPositionCalc + context.dataIndex;
                return context.chart.data.labels[labelIndex];    
            }
        },
        anchor:'center'    },
      legend: {
        labels: {
            generateLabels: (chart) => ""
        },
        onClick: function(mouseEvent, legendItem, legend) {
            // toggle the visibility of the dataset from what it currently is
            legend.chart.getDatasetMeta(
                legendItem.datasetIndex
            ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
            legend.chart.update();
        }
    },
    tooltip: {
        callbacks: {
            label: function(context) {
                if(context.datasetIndex === 0){
                    const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
                    return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
                }else{
                    let indexPositionCalc = 0;
                    for (let index = 0; index < context.datasetIndex; index++) {
                        indexPositionCalc += context.chart.data.datasets[index].data.length;
                    }
                    const labelIndex = indexPositionCalc + context.dataIndex;
                    return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;    
                }
            },
            title: function(context) {
                if(context[0].datasetIndex === 0){
                    const labelIndex = (context[0].datasetIndex * 2) + context[0].dataIndex;
                    return context[0].chart.data.labels[labelIndex] + ': ' + context[0].formattedValue;
                }else{
                    let indexPositionCalc = 0;
                    for (let index = 0; index < context[0].datasetIndex; index++) {
                        indexPositionCalc += context[0].chart.data.datasets[index].data.length;
                    }
                    const labelIndex = indexPositionCalc + context[0].dataIndex;
                    return context[0].chart.data.labels[labelIndex] + ': ' + context[0].formattedValue;    
                }
            }
        }
    }
};