<script>
    import {ArcElement, CategoryScale, Chart, Legend, Title, Tooltip} from "chart.js";
    import {data_default} from "./data.js";
    import {Doughnut, Pie} from "svelte-chartjs";
    import {options} from "./options.js";

    Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

    let files;
    let data = data_default;

    $: if (files) {
        console.log(files);
        for (const file of files) {
            console.log(`${file.name}: ${file.size} bytes`);
            file
                .text()
                .then((e)=>{
                    data = JSON.parse(e);
                })
        }
    }

</script>
<Doughnut {data} {options} />
<div>
    <a href="../../public/data_template.json" target="_blank">data_template.json Template</a>
</div>
<div>
    <label for="dataFile">Upload data_template.json file:</label>
    <input accept="application/json" id="dataFile" name="dataFile" type="file" bind:files/>
</div>


