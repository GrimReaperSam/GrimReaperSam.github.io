$(document).ready(function() {

  ///////////////////////////
  // SETUP VARIABLES START //
  ///////////////////////////
  var word = "Hello World!";
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ?!.,:;";

  var fontFamily = "'open_sansbold',Arial,sans-serif";
  var nonMatchColor = "#85878b";
  var matchColor = "#ffffff";
  var nonMatchBgnd = "#33373d";
  var matchBgnd = "#558e6a";
  var width = 50;
  var height = 20;

  var fitness = function(original, candidate) {
    var fitness = 0;

    var i;
    for (i = 0;i < original.length; ++i) {
      if (original[i] == candidate[i]) {
          fitness += 1;
      }
      fitness += (127 - Math.abs(original.charCodeAt(i) - candidate.charCodeAt(i))) / 127;
    }

    return Math.round(fitness * 100) / 100;
  }
  /////////////////////////
  // SETUP VARIABLES END //
  /////////////////////////

  //////////////////////////////
  // POPULATION EXAMPLE START //
  //////////////////////////////
  var svg = d3.select("#population-example").append("svg")
    .attr("viewBox", `0 0 ${(width + 1) * word.length} ${(height + 5) * 4}`);

  _(4).times(function(index) {
      var dims = {"x": 0, "y": (height + 5) * index, "width": width, "height": height};
      var chr = new Chromosome(svg, word.length, dims)
      chr.textattr("font-family", "'open_sansbold',Arial,sans-serif");
      chr.textattr("fill", nonMatchColor);
      chr.rectattr("fill", nonMatchBgnd);

      _(word.length).times(function(idx) {
        var char = charset.charAt(Math.floor(Math.random() * charset.length))
        chr.setText(char, idx);
        if (char === word.charAt(idx)) {
          chr.textattr("fill", matchColor, idx);
          chr.rectattr("fill", matchBgnd, idx);
        }
      })
    });
    ////////////////////////////
    // POPULATION EXAMPLE END //
    ////////////////////////////


    //////////////////////////////
    // MATCHING 5 EXAMPLE START //
    //////////////////////////////
    var svg = d3.select("#matching-five-example").append("svg")
      .attr("viewBox", `0 0 ${(width + 1) * word.length} ${height}`);
    var matchSix = "H.plo!LoAndi";

    var dims = {"x": 0, "y": 0, "width": width, "height": height};
    var chr = new Chromosome(svg, word.length, dims)
    chr.textattr("font-family", "'open_sansbold',Arial,sans-serif");
    chr.textattr("fill", nonMatchColor);
    chr.rectattr("fill", nonMatchBgnd);

    _(word.length).times(function(idx) {
      var char = matchSix.charAt(idx)
      chr.setText(char, idx);
      if (char === word.charAt(idx)) {
        chr.textattr("fill", matchColor, idx);
        chr.rectattr("fill", matchBgnd, idx);
      }
    });

    $('#matching-five-fitness').html(fitness(word, matchSix));
    $('#worle-fitness').text(fitness(word, "Hello Worle!"));
    $('#worly-fitness').text(fitness(word, "Hello Worly!"));
    ////////////////////////////
    // MATCHING 5 EXAMPLE END //
    ////////////////////////////
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
