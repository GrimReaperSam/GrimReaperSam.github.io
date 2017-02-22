Number.prototype.times = function(func) {
    for(var i = 0; i < Number(this); i++) {
        func(i);
    }
}

function Chromosome(svg, size, dims) {
    this.size = size;
    this.dims = dims;

    this.svg = svg;
    this.group = this.svg.append("g")
              .attr("transform", `translate(${this.dims.x}, ${this.dims.y})`);

    this.size.times(function(i) {
      var gene = this.group.append("g");

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
    }.bind(this));

    this.genes = this.group.selectAll("g");
    this.rects = this.genes.selectAll("rect");
    this.texts = this.genes.selectAll("text");

    this.setText = function(value, index) {
      if (index == undefined) {
        this.genes.selectAll("text").text(value);
      } else {
        this.getGene(index).select("text").text(value);
      }
    }

    this.attr = function(name, value, object, index) {
      if (index === undefined) {
        this.genes.selectAll(object).attr(name, value);
      } else {
        this.getGene(index).select(object).attr(name, value);
      }
    }

    this.textattr = function(name, value, index) {
        this.attr(name, value, "text", index);
    }

    this.rectattr = function(name, value, index) {
      this.attr(name, value, "rect", index);
    }

    this.getGene = function(index) {
      return this.genes.filter(function(d, i) {return i === index});
    }

    this.clone = function() {
      return new Chromosome(this.svg, this.size, this.dims);
    }

    this.remove  = function() {
      this.genes.remove();
    }

}
