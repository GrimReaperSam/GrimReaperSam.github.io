$(document).ready(function() {

    ///////////////////////////
    // SETUP VARIABLES START //
    ///////////////////////////
    const word = "Hello World!";
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const fontFamily = "'open_sansbold',Arial,sans-serif";
    const nonMatchColor = "#85878b";
    const matchColor = "#ffffff";
    const nonMatchBgnd = "#33373d";
    const matchBgnd = "#558e6a";
    const splitColor = "#cd5353";
    const width = 50;
    const height = 20;

    const randomWord = function() {
    let randomWord = '';
    _(word.length).times(function()  {
      randomWord += charset.charAt(Math.floor(Math.random() * charset.length))
    });
    return randomWord;
    };

    const fitness = function(candidate) {
    let fitness = 0;

    for (let i = 0;i < word.length; ++i) {
      if (word[i] === candidate[i]) {
          fitness += 1;
      }
      fitness += (127 - Math.abs(word.charCodeAt(i) - candidate.charCodeAt(i))) / 127.0;
    }

    return Math.round(fitness * 100.0) / 100;
    };

    const setText = function(chromosome, text) {
    chromosome.textattr("font-family", fontFamily);
    chromosome.textattr("fill", nonMatchColor);
    chromosome.rectattr("fill", nonMatchBgnd);

    _(word.length).times(function(idx) {
      chromosome.setText(text[idx], idx);
      if (text[idx] === word.charAt(idx)) {
        chromosome.textattr("fill", matchColor, idx);
        chromosome.rectattr("fill", matchBgnd, idx);
      }
    })
    };

    const endAll = function(transition, callback) {
    let n = 0;
    transition.each(function() { ++n; })
      .on('end', function() {
        if (!--n) callback.apply(this, arguments);
      });
    };

    /////////////////////////
    // SETUP VARIABLES END //
    /////////////////////////

    //////////////////////////////
    // POPULATION EXAMPLE START //
    //////////////////////////////
    let populationSvg = d3.select("#population-example").append("svg")
    .attr("viewBox", `0 0 ${(width + 1) * word.length} ${(height + 5) * 4}`);

    _(4).times(function(index) {
    const dims = {"x": 0, "y": (height + 5) * index, "width": width, "height": height};
    let populationChr = new Chromosome(populationSvg, word.length, dims);
    setText(populationChr, randomWord());
    });
    ////////////////////////////
    // POPULATION EXAMPLE END //
    ////////////////////////////

    //////////////////////////////
    // MATCHING 5 EXAMPLE START //
    //////////////////////////////
    let matchingFiveSvg = d3.select("#matching-five-example").append("svg")
    .attr("viewBox", `0 0 ${(width + 1) * word.length} ${height}`);
    const matchSix = "H.plo!LoAndi";

    const matchingFiveDims = {"x": 0, "y": 0, "width": width, "height": height};
    let matchingFiveChr = new Chromosome(matchingFiveSvg, word.length, matchingFiveDims);
    setText(matchingFiveChr, matchSix);

    $('#matching-five-fitness').text(fitness(matchSix));
    $('#worle-fitness').text(fitness("Hello Worle!"));
    $('#worly-fitness').text(fitness("Hello Worly!"));
    ////////////////////////////
    // MATCHING 5 EXAMPLE END //
    ////////////////////////////


    /////////////////////////////
    // CROSSOVER EXAMPLE START //
    /////////////////////////////
    const distance = 30;
    const crossoverSvg = d3.select("#crossover-example").append("svg")
    .attr("viewBox", `0 0 ${(width + 1) * word.length} ${height * 4 + distance * 4}`);
    const dad = "Happy Bored!";
    const mom = "Peibo Random";

    const dadDims = {"x": 0, "y": 0, "width": width, "height": height};
    const dadChr = new Chromosome(crossoverSvg, word.length, dadDims);
    setText(dadChr, dad);
    let firstChild = dadChr.clone();
    setText(firstChild, dad);

    const momDims = {"x": 0, "y": distance + height, "width": width, "height": height};
    const momChr = new Chromosome(crossoverSvg, word.length, momDims);
    setText(momChr, mom);
    let secondChild = momChr.clone();
    setText(secondChild, mom);

    // SINGLE POINT CROSSOVER //
    const crossoverPoint = Math.floor(Math.random() * (word.length - 6)) + 2;
    const crossoverLine = crossoverSvg.append("line")
    .attr("stroke", splitColor)
    .attr("stroke-width", 2)
    .attr("x1", (width + 1) * crossoverPoint)
    .attr("y1", 0)
    .attr("x2", (width + 1) * crossoverPoint)
    .attr("y2", distance + height * 2);

    const beginCrossover = function() {
        firstChild = dadChr.clone();
        secondChild = momChr.clone();
        setText(firstChild, dad);
        setText(secondChild, mom);
        crossoverLine.attr("transform", "translate(0, 0)")
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("transform", `translate(0, ${(height + distance) * 2 + distance})`)
          .call(endAll, function() {
              firstChildCross();
          })
    };

    const firstChildCross = function() {
    firstChild.genes.filter(function(d, i) { return i < crossoverPoint})
        .attr("transform", "translate(0, 0)")
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr("transform", `translate(0, ${(height + distance) * 2 + distance})`)
        .call(endAll, function() {
          secondChild.genes.filter(function(d, i) {return i >= crossoverPoint})
            .attr("transform", "translate(0, 0)")
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr("transform", `translate(0, ${height + distance * 2})`)
            .call(endAll, function() {
              secondChildCross();
            });
        });
    };
    const secondChildCross = function() {
    firstChild.genes.filter(function(d, i) { return i >= crossoverPoint})
      .attr("transform", "translate(0, 0)")
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .attr("transform", `translate(0, ${(height + distance) * 3 + distance})`)
      .call(endAll, function() {
        secondChild.genes.filter(function(d, i) {return i < crossoverPoint})
          .attr("transform", "translate(0, 0)")
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("transform", `translate(0, ${(height + distance) * 2 + distance})`);
      });
    };

    // Run and restart buttons
    const social = $('<div/>').addClass('social').css('text-align', 'center').appendTo($('#crossover-example'));
    const ul = $('<ul/>').appendTo(social);
    const li = $('<li/>').appendTo(ul);
    const button = $('<a/>').attr('href', '#').appendTo(li);
    const icon = $('<i/>').addClass('icon-loop').appendTo(button);

    button.click(function(e) {
      e.preventDefault();
      firstChild.genes.transition().duration(0);
      firstChild.remove();
      secondChild.genes.transition().duration(0);
      secondChild.remove();
      beginCrossover();
    });
    beginCrossover();
    /////////////////////////////
    // CROSSOVER 5 EXAMPLE END //
    /////////////////////////////
});
