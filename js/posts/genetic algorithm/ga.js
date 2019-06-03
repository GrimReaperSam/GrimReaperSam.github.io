$(document).ready(function() {

    ///////////////////////////
    // SETUP VARIABLES START //
    ///////////////////////////
    const word = "Hello World!";
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

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

    //
    // const endAll = function(transition, callback) {
    // let n = 0;
    // transition.each(function() { ++n; })
    //   .on('end', function() {
    //     if (!--n) callback.apply(this, arguments);
    //   });
    // };

    /////////////////////////
    // SETUP VARIABLES END //
    /////////////////////////

    //////////////////////////////
    // POPULATION EXAMPLE START //
    //////////////////////////////
    let populationSvg = d3.select("#population-example").append("svg")
    .attr("viewBox", `0 0 ${(width + 1) * word.length} ${(height + 5) * 4}`);
    _(4).times(function(index) {
        const dims = {"x": 0, "y": (height + 5) * index};
        new Chromosome(populationSvg, dims, randomWord());
        // setText(populationChr, randomWord());
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

    const matchingFiveDims = {"x": 0, "y": 0};
    let matchingFiveChr = new Chromosome(matchingFiveSvg, matchingFiveDims, matchSix);

    $('#matching-five-fitness').text(fitness(matchSix));
    $('#worle-fitness').text(fitness("Hello Worle!"));
    $('#worly-fitness').text(fitness("Hello Worly!"));
    // ////////////////////////////
    // // MATCHING 5 EXAMPLE END //
    // ////////////////////////////
    //
    //
    // /////////////////////////////
    // // CROSSOVER EXAMPLE START //
    // /////////////////////////////
    const distance = 30;
    const crossoverSvg = d3.select("#crossover-example").append("svg")
    .attr("viewBox", `0 0 ${(width + 1) * word.length} ${height * 4 + distance * 3}`);
    const dad = "Happy Bored!";
    const mom = "Peibo Random";

    const dadDims = {"x": 0, "y": 0};
    const dadChr = new Chromosome(crossoverSvg, dadDims, dad);
    // setText(dadChr, dad);
    // let firstChild = dadChr.clone();
    // setText(firstChild, dad);
    //
    const momDims = {"x": 0, "y": distance + height};
    const momChr = new Chromosome(crossoverSvg, momDims, mom);
    // setText(momChr, mom);
    // let secondChild = momChr.clone();
    // setText(secondChild, mom);
    //
    // // SINGLE POINT CROSSOVER //
    const crossoverPoint = Math.floor(Math.random() * (word.length - 2)) + 1;
    const crossoverLine = crossoverSvg.append("line")
    .attr("stroke", splitColor)
    .attr("stroke-width", 2)
    .attr("x1", (width + 1) * crossoverPoint)
    .attr("y1", 0)
    .attr("x2", (width + 1) * crossoverPoint)
    .attr("y2", distance + height * 2);

    ChromosomeCrossover(crossoverSvg, dadChr, momChr, crossoverPoint);

    let secondChildP1 = new Chromosome(crossoverSvg, momDims, momChr.text.slice(0, crossoverPoint));
    move(secondChildP1, 0, 2 * (distance + height));
    let s2dims = {'x': (width+1)*crossoverPoint, y:0};
    let secondChildP2 = new Chromosome(crossoverSvg, s2dims, dadChr.text.slice(crossoverPoint));
    move(secondChildP2, 0, 3 * (distance + height));

    //
    const beginCrossover = function() {
        // firstChild = dadChr.clone();
        // secondChild = momChr.clone();
        // setText(firstChild, dad);
        // setText(secondChild, mom);
        crossoverLine.attr("transform", "translate(0, 0)")
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("transform", `translate(0, ${(height + distance) * 2})`)
          // .call(endAll, function() {
          //     firstChildCross();
          // })
    };
    //
    // const firstChildCross = function() {
    // firstChild.genes.filter(function(d, i) { return i < crossoverPoint})
    //     .attr("transform", "translate(0, 0)")
    //     .transition()
    //     .duration(500)
    //     .ease(d3.easeLinear)
    //     .attr("transform", `translate(0, ${(height + distance) * 2})`)
    //     .call(endAll, function() {
    //       secondChild.genes.filter(function(d, i) {return i >= crossoverPoint})
    //         .attr("transform", "translate(0, 0)")
    //         .transition()
    //         .duration(500)
    //         .ease(d3.easeLinear)
    //         .attr("transform", `translate(0, ${height + distance})`)
    //         .call(endAll, function() {
    //           secondChildCross();
    //         });
    //     });
    // };
    // const secondChildCross = function() {
    // firstChild.genes.filter(function(d, i) { return i >= crossoverPoint})
    //   .attr("transform", "translate(0, 0)")
    //   .transition()
    //   .duration(500)
    //   .ease(d3.easeLinear)
    //   .attr("transform", `translate(0, ${(height + distance) * 3})`)
    //   .call(endAll, function() {
    //     secondChild.genes.filter(function(d, i) {return i < crossoverPoint})
    //       .attr("transform", "translate(0, 0)")
    //       .transition()
    //       .duration(500)
    //       .ease(d3.easeLinear)
    //       .attr("transform", `translate(0, ${(height + distance) * 2})`);
    //   });
    // };
    //
    // // Run and restart buttons
    const social = $('<div/>').addClass('social margTSSSmall margBMSSSmall').css('text-align', 'center').appendTo($('#crossover-example'));
    const ul = $('<ul/>').appendTo(social);
    const li = $('<li/>').appendTo(ul);
    const button = $('<a/>').attr('href', '#').appendTo(li);
    const icon = $('<i/>').addClass('icon-loop').appendTo(button);

    button.click(function(e) {
      e.preventDefault();
      // firstChild.genes.transition().duration(0);
      // firstChild.remove();
      // secondChild.genes.transition().duration(0);
      // secondChild.remove();
      beginCrossover();
    });
    beginCrossover();
    /////////////////////////////
    // CROSSOVER 5 EXAMPLE END //
    /////////////////////////////
});
