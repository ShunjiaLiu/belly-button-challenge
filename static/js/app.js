// Use the D3 library to read in samples.json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function getPlots(id) {
    // Read samples.json
    d3.json(url).then(sampledata => {
        
        console.log(sampledata);

        // Extract and log otu_ids, sample_values, and otu_labels for the first sample
        let ids = sampledata.samples[0].otu_ids;
        console.log("otu_ids:", ids);

        let sampleValues = sampledata.samples[0].sample_values.slice(0, 10).reverse();
        console.log("sample_values:", sampleValues);

        let labels = sampledata.samples[0].otu_labels.slice(0, 10);
        console.log("otu_labels:", labels);

        // create bar chart
        let OTU_top = sampledata.samples[0].otu_ids.slice(0, 10).reverse();
        let OTU_id = OTU_top.map(d => "OTU " + d);
        console.log("OTU IDS:", OTU_id);

        let trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        };

        let data = [trace];

        let layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // Create bar plot
        Plotly.newPlot("bar", data, layout);

        // Process data to create bubble chart
        let trace1 = {
          x: sampledata.samples[0].otu_ids,
          y: sampledata.samples[0].sample_values,
          mode: "markers",
          marker: {
              size: sampledata.samples[0].sample_values,
              color: sampledata.samples[0].otu_ids
          },
          text: sampledata.samples[0].otu_labels
      };

      let layout_2 = {
          xaxis: { title: "OTU ID" },
          height: 600,
          width: 1000
      };

      let data1 = [trace1];

      // Create bubble plot
      Plotly.newPlot("bubble", data1, layout_2);
  });
}

// Function to get demographic information
function getDemoInfo(id) {
  d3.json(url).then(data => {
      let metadata = data.metadata;
      console.log(metadata);

      let result = metadata.filter(meta => meta.id.toString() === id)[0];
      let demographicInfo = d3.select("#sample-metadata");

      demographicInfo.html("");

      Object.entries(result).forEach((key) => {
          demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
      });
  });
}

// Function for the change event
function optionChanged(id) {
  getPlots(id);
  getDemoInfo(id);
}

// Function for the initial data rendering
function init() {
  // Select dropdown menu
  let dropdown = d3.select("#selDataset");

  // Read the data
  d3.json(url).then(data => {
      console.log(data);

      // Get the id data to the dropdown menu
      data.names.forEach(function (name) {
          dropdown.append("option").text(name).property("value");
      });

      // display the data and the plots to the page
      getPlots(data.names[0]);
      getDemoInfo(data.names[0]);
  });
}

// Call init function to initialize the page
init();