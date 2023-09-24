// URL of the JSON data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to fetch the JSON data
d3.json(url).then(function(data) {
  // Extract the necessary data
  let samples = data.samples
  const sampleids = data.samples.map(sample => sample.id);
  
    // The 'data' variable now contains the JSON data from the URL
    console.log(data);

    // You can perform further operations with the data here
  })
  .catch(function(error) {
    console.error("Error fetching data:", error);
  });

  // URL of the JSON data
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Function to create the horizontal bar chart
function createHorizontalBarChart(sampleData) {
    var top10Values = sampleData.sample_values.slice(0, 10).reverse();
    var top10Labels = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    var hoverText = sampleData.otu_labels.slice(0, 10).reverse();

    var trace = {
        type: "bar",
        x: top10Values,
        y: top10Labels,
        text: hoverText,
        orientation: "h"
    };

    var layout = {
        title: "Top 10 OTUs Found",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
    };

    var chartData = [trace];

    // Use Plotly.js to create the chart in the "bar" div
    Plotly.newPlot("bar", chartData, layout);
}

// Function to update the chart based on the selected individual
function optionChanged(selectedValue) {
    d3.json(dataURL).then(function(data) {
        var selectedSample = data.samples.find(sample => sample.id === selectedValue);
        createHorizontalBarChart(selectedSample);
    });
}

// Function to initialize the page with default values
function init() {
    var dropdown = d3.select("#selDataset");

    // Fetch data and populate the dropdown
    d3.json(dataURL).then(function(data) {
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value", name);
        });

        // Get the first value in the dropdown and create the chart
        var initialSample = data.names[0];
        createHorizontalBarChart(data.samples.find(sample => sample.id === initialSample));

        // Initialize demographic info (you may add this part)
        // var metadata = data.metadata.find(meta => meta.id === initialSample);
        // updateDemographicInfo(metadata);
    });
}

// Call the init function to initialize the page
init();

// Function to create the bubble chart
function createBubbleChart(sampleData) {
    var xValues = sampleData.otu_ids;
    var yValues = sampleData.sample_values;
    var markerSize = sampleData.sample_values;
    var markerColors = sampleData.otu_ids;
    var textValues = sampleData.otu_labels;

    var trace = {
        x: xValues,
        y: yValues,
        text: textValues,
        mode: 'markers',
        marker: {
            size: markerSize,
            color: markerColors,
            colorscale: 'Earth' // You can choose a different colorscale
        }
    };

    var layout = {
        title: 'Bubble Chart',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' }
    };

    var chartData = [trace];

    // Use Plotly.js to create the chart in the "bubble" div
    Plotly.newPlot("bubble", chartData, layout);
}

// Function to update the bubble chart based on the selected individual
function optionChanged(selectedValue) {
    d3.json(dataURL).then(function(data) {
        var selectedSample = data.samples.find(sample => sample.id === selectedValue);
        createHorizontalBarChart(selectedSample);
        createBubbleChart(selectedSample);
    });
}

// Call the init function to initialize the page
init();

// Function to update the demographic info panel
function updateDemographicInfo(metadata) {
    // Select the panel body
    var panelBody = d3.select("#sample-metadata");

    // Clear existing content
    panelBody.html("");

    // Iterate over the key-value pairs in the metadata
    Object.entries(metadata).forEach(([key, value]) => {
        panelBody.append("p").text(`${key}: ${value}`);
    });
}

// Function to update the chart based on the selected individual
function optionChanged(selectedValue) {
    d3.json(dataURL).then(function(data) {
        var selectedSample = data.samples.find(sample => sample.id === selectedValue);
        var selectedMetadata = data.metadata.find(metadata => metadata.id === parseInt(selectedValue));

        createHorizontalBarChart(selectedSample);
        createBubbleChart(selectedSample);
        updateDemographicInfo(selectedMetadata);
    });
}

// Call the init function to initialize the page
init();
