// create and add the canvas
var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'myViz';
document.body.appendChild(canvasElement);

dscc.subscribeToData(function(data) {
  // var dataByConfigId = data.tables.DEFAULT;
  // var mydata = dataByConfigId.map(function(d) {
  //   console.log(d);
  //   return {
  //     dimension: d['barDimension'][0],
  //     metric: d['barMetric'][0],
  //   };
  // })

  // // sort by dimension to order the data
  // mydata.sort(function(x, y) {
  //   return d3.ascending(x.dimension, y.dimension);
  // });
  
  var mydata = [
    { "name": "Percent", "value": 60 },
    { "name": "Remain", "value": 40 },
  ];
  var context = canvasElement.getContext('2d');

  // var width = dscc.getWidth();
  // var height = document.documentElement.clientHeight - 20;
  context.canvas.width = dscc.getWidth() - 10;
  context.canvas.height = dscc.getHeight() - 10;
  var radius = Math.min(context.canvas.width, context.canvas.height) / 2;

  let colors = ["#d87c2e", "#f3f3f3"];

  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 10)
      .context(context);

  var pie = d3.pie()
      .sort(null)
      .value(function(d) {    
          // return d.value; 
          return d.metric; 
      });

  context.translate(context.canvas.width / 2, context.canvas.height / 2);

  var arcs = pie(mydata);

  arcs.forEach(function(d, i) {
    context.beginPath();
    arc(d);
    
    // if(d.data.value > 50)
    if(d.data.metric > 50)
      colors = ["green", "#f3f3f3"];
    
    context.fillStyle = colors[i];
    context.fill();
});
  }, {transform: dscc.objectTransform});

