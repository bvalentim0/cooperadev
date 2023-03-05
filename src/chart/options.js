import {Chart} from "chart.js";

export const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                generateLabels: function(chart) {
                    // Get the default label list
                    const original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                    const labelsOriginal = original.call(this, chart);

                    // Build an array of colors used in the datasets of the chart
                    let datasetColors = chart.data.datasets.map(function(e) {
                        return e.backgroundColor;
                    });
                    datasetColors = datasetColors.flat();

                    // Modify the color and hide state of each label
                    labelsOriginal.forEach(label => {
                        // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
                        label.datasetIndex = (label.index - label.index % 2) / 2;

                        // The hidden state must match the datasets hidden state
                        //label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                        // Change the color to match the dataset
                        label.fillStyle = datasetColors[label.index];
                    });

                    return labelsOriginal;
                }
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
    }
};
