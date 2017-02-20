Number.prototype.times = function(func) {
    for(var i = 0; i < Number(this); i++) {
        func(i);
    }
}

function Chromosome(svg, size, dims) {
    this.size = size;
    this.genes = [];
    this.dims = dims;

    this.svg = svg.append("g")
              .attr("transform", `translate(${this.dims.x}, ${this.dims.y})`);

    this.size.times(function(i) {
      var gene = this.svg.append("g");

      gene.append("rect")
        .attr("x", (this.dims.width + 1) * i)
        .attr("y", 0)
        .attr("width", this.dims.width)
        .attr("height", this.dims.height);

      gene.append("text")
        .attr("x", (this.dims.width + 1) / 2 + (this.dims.width + 1) * i)
        .attr("y", this.dims.height / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(`Gene (${i})`);

      this.genes.push(gene);
    }.bind(this));

    this.setText = function(value, index) {
      if (index == undefined) {
        this.svg.selectAll("text").text(value);
      } else {
        this.genes[index].selectAll("text").text(value);
      }
    }

    this.attr = function(name, value, object, index) {
      if (index === undefined) {
        this.svg.selectAll(object).attr(name, value);
      } else {
        this.genes[index].selectAll(object).attr(name, value);
      }
    }

    this.textattr = function(name, value, index) {
        this.attr(name, value, 'text', index);
    }

    this.rectattr = function(name, value, index) {
      this.attr(name, value, 'rect', index);
    }

    this.getGenes = function() {
      return this.genes;
    }

    this.getGene = function(index) {
      return this.genes[index];
    }

}
