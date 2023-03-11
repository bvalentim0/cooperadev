<script>
    import {ArcElement, CategoryScale, Chart, Legend, Title, Tooltip} from "chart.js";
    import ChartDataLabels from 'chartjs-plugin-datalabels';
    import {data_default} from "./data.js";
    import {Doughnut} from "svelte-chartjs";
    import {options} from "./options.js";

    Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale,ChartDataLabels);
    let data = data_default;

    const spreadsheetID = "1dKpiklhhPBdCRuJE1Cc95kwxVTDzQ9H23kTc42Em_Ik";
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
        
        let list = json.table.rows.map(e => e.c).map(e => e[2]).map(e => e.v);
        let grouped =list.map(value => [value, list.filter(str => str === value).length]);
        let uniqueGroups = removeDuplicates(grouped);

        uniqueGroups.forEach((g) =>{
            if(g[0] === "Cargo"){ return;}
            let dataSetModel = {"data":[], "backgroundColor":[]};
            dataSetModel.data.push(g[1]);
            dataSetModel.backgroundColor.push(randomHexColor());

            data.datasets.push(dataSetModel);
            data.labels.push(g[0] + " : " + g[1]);
            
        })
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

function removeDuplicates(grouped) {
    const groupedOrdered = grouped.sort();
    let unique = [];

    groupedOrdered.forEach(element => {
        if(!hasElement(unique,element)){
            unique.push(element);
        }
    });
    return unique;
}

function hasElement(unique, element){
    let has = false;
    unique.forEach(e=> {
        if(e[0]=== element[0]){
            has = true;
        }
    });
    return has;
}
</script>
<Doughnut {data} {options} />

