<script>
    import {ArcElement, CategoryScale, Chart, Legend, Title, Tooltip} from "chart.js";
    import ChartDataLabels from 'chartjs-plugin-datalabels';
    import {data_default} from "./data.js";
    import {Doughnut} from "svelte-chartjs";
    import {options} from "./options.js";

    Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale,ChartDataLabels);
    let data = data_default;

    const spreadsheetID = "19iUltt-WpJ3bpD5qJP4kuJuVPkYVNgDNitAEE_36uXg";
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json`;

    window.onscroll = function () {
        scrollRotate();
    };

    fetch(url)
    .then(res => res.text())
    .then(text => {
        const json = JSON.parse(text.replaceAll("/*O_o*/","").replaceAll("google.visualization.Query.setResponse(","").replaceAll(");",""));
        data.labels = [];
        data.datasets = [];
        
        json.table.cols.forEach(col => {
            if(col.label !== "#"){
                data.labels.push(col.label);
            }
           
        });
        
        json.table.rows.forEach(row => {
            let dataSetModel = {"data":[], "backgroundColor":[]};
 
            row.c.forEach(element => {
                if(element.v !== "#"){
                    dataSetModel.data.push(element.v);
                    dataSetModel.backgroundColor.push(randomHexColor());
                }else{
                    data.datasets.push(dataSetModel);
                    dataSetModel = {"data":[], "backgroundColor":[]};
                }
                
            });
            data.datasets.push(dataSetModel)
        });

    });


function randomHexColor() {
    let [r,g,b] =randomRgbColor();
    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');
    return "#" + hr + hg + hb;
}

function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r,g,b];
}

function randomInteger(max) {
    return Math.floor(Math.random()*(max + 1));
}

function scrollRotate() {
    document.querySelector("canvas").style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
}

</script>
<Doughnut {data} {options} />

