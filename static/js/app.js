//Use the D3 library to read in samples.json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
var dropdownMeun = d3.select("#selDataset");
data.names.forEach(function(sample){
  dropdownMenu.append("option").text(sample).property("value", sample);
});


//Use sample_values as the values for the bar chart.
function updateBarchart(sample){
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data){
    var selectedSampleData = data.samples.filter(function(d){
      return d.id === sample;
    })[0];

//Use otu_ids as the labels for the bar chart.


//Use otu_labels as the hovertext for the chart.
