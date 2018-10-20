function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // how do I insert breaks between these strings???
  var defaultURL = `/metadata/${sample}`;
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(defaultURL).then(function(data) {
    console.log(data);
    // var washFreq = data['WFREQ'];
    var meta_string = `sample: ${data['sample']}
    <br> BBYTYPE: ${data['BBTYPE']}
    <br> ETHNICITY: ${data['ETHNICITY']}
    <br> GENDER: ${data['GENDER']}
    <br> LOCATION: ${data['LOCATION']}
    <br> WFREQ: ${data['WFREQ']}
    <br> AGE: ${data['AGE']}`
  
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.select("#sample-metadata").html(meta_string);
    
    // document.getElementById("demo").innerHTML = meta_string;=
    // meta_data_input.property.text("insert data variable here");
  })


    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var defaultURL = `/samples/${sample}`;

  d3.json(defaultURL).then(function(data) {
    console.log(data);
    
    trace1 = {

      labels: data.otu_ids.slice(0,9),
      values: data.sample_values.slice(0,9),

      type: "pie"
    };

    console.log(trace1);

    var data_1 = [trace1];
    var layout = {
      showlegend: true,
      height: 500,
      legend: {
        x: 1,
        y: 0.8
      },
      title: "belly-button top bacteria"
    };
    Plotly.newPlot("pie", data_1, layout);






var defaultURL = `/metadata/${sample}`;
// Use `d3.json` to fetch the metadata for a sample
d3.json(defaultURL).then(function(data) {
  // console.log(data);
  var washFreq = data['WFREQ'];
  console.log(`Wash Frequency:  ${washFreq}`);



  // Enter a speed between 0 and 180
  // var defaultURL = `/metadata/${sample}`;

    // Use `d3.json` to fetch the metadata for a sample
  // var washFreq = d3.json(defaultURL)['WFREQ'];
  // console.log(`Wash Frequency:  ${washFreq}`);
  // var level = 175;
  var level = washFreq * 18;


  // Trig to calc meter point
  var degrees = 180 - level,
      radius = 0.5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var data_2 = [{ type: 'scatter',
    x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'speed',
      text: level,
      hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6',
              '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(0, 255, 0, 1)', 'rgba(32, 223, 0, 1)',
                          'rgba(64, 191, 0, 1)', 'rgba(96, 159, 0, 1)',
                          'rgba(128, 128, 0, 1)', 'rgba(159, 96, 0, 1)',
                          'rgba(191, 64, 0, 1)','rgba(223, 32, 0, 1)',
                          'rgba(255, 0, 0, 1)','rgba(0, 0, 0, 0)']},
    labels: ['8-9', '7-8', '6-7', '5-6',
    '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    title: 'Belly Button Washes/Week',
    Speed: '0-100',
    // height: 1000,
    // width: 1000,
    xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge', data_2, layout);
})




// Bubble Chart
console.log(`data.otu_ids:  ${data.otu_ids}`);

    var trace3 = {
      x: data.otu_ids,
      y: data.sample_values,
      sizes: data.sample_values,
      colors: data.otu_ids,
      names: data.otu_labels,
      mode: "markers",
      type: "scatter",
      marker: {
        color: data.otu_ids,
        size: data.sample_values
      }
    };

    var data_3 = [trace3];

    var layout = {
      title: "Belly Button Bacteria Bubbles",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "OTU value" }
    };

    Plotly.newPlot("bubble", data_3, layout);



  });
    // @TODO: Build a Bubble Chart using the sample data


    
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      // if (Number.isInteger(sample)){
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
        // }
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
// buildCharts(newSample);
