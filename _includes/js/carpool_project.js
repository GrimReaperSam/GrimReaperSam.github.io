// COLORS and FONTS
var fontFamily = "'open_sansbold',Arial,sans-serif";
var riderColor = "#ffffff";
var riderBgnd = "#558e6a";
var driverColor = "#85878b";
var driverBgnd = "#33373d";
var width = 50;
var height = 20;

// RIDE EXAMPLE
var dims = {"x":0, "y": 0, "width": width, "height": height};
var size = 6;
var svg = d3.select("#ride-example").append("svg")
.attr("viewBox", `0 0 ${(dims.width + 1) * size} ${dims.height}`);
var chr = new Chromosome(svg, size, dims)
chr.setText("Rider");
chr.setText("Driver", 0);
chr.setText("...", 3);

chr.textattr("font-family", fontFamily);
chr.textattr("fill", riderColor);
chr.textattr("fill", driverColor, 0);
chr.rectattr("fill", riderBgnd);
chr.rectattr("fill", driverBgnd, 0);

// SOLUTION EXAMPLE
var distribution = [3, 5, 4]

var svg = d3.select("#solution-example").append("svg")
  .attr("viewBox", `0 0 ${(width + 1) * 5 * 1.5} ${(height + 2) * 3}`);

_.each(distribution, function(element, index) {
  svg.append("text")
    .attr("x", 0)
    .attr("y", (height + 2) * index + height / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "center")
    .attr("font-family", "'open_sansbold',Arial,sans-serif")
    .attr("fill", "#999999")
    .text(`Ride #${index+1}`);


  var dims = {"x": 60, "y": (height + 2) * index, "width": width, "height": height};
  var chr = new Chromosome(svg, element, dims)
  chr.setText("R");
  chr.setText("D", 0);
  chr.textattr("font-family", "'open_sansbold',Arial,sans-serif");
  chr.textattr("fill", "#ffffff");
  chr.textattr("fill", "#85878b", 0);
  chr.rectattr("fill", "#558e6a");
  chr.rectattr("fill", "#33373d", 0);
});

// var repeat = function() {
//   chr.getGene(1)
//   .transition()
//   .duration(2000)
//   .ease(d3.easeLinear)
//   .attr("transform", "translate(0, 50)")
//   .on("end", function() {
//     chr.getGene(1)
//     .transition()
//     .duration(2000)
//     .ease(d3.easeLinear)
//     .attr("transform", "translate(0, 0)")
//     .on("end", repeat);
//   });
// }
// repeat();
