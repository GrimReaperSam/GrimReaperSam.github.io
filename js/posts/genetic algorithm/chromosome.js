Number.prototype.times = function(func) {
    for(var i = 0; i < Number(this); i++) {
        func(i);
    }
};

const fontFamily = "'open_sansbold',Arial,sans-serif";
const nonMatchColor = "#85878b";
const matchColor = "#ffffff";
const nonMatchBgnd = "#33373d";
const matchBgnd = "#558e6a";
const splitColor = "#cd5353";

const goal = 'Hello World!';
const width = 50;
const height = 20;

let update = function(chr) {
    chr.gene.selectAll('rect').data(chr.text).enter()
        .append('g').append("rect")
        .attr("x", (d, i) => (width + 1) * i)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr('fill', (d, i) => d === goal[i] ? matchBgnd: nonMatchBgnd);

    chr.gene.selectAll('g').append("text")
        .attr("x", (d, i) => (width + 1) / 2 + (width + 1) * i)
        .attr("y", height / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr('font-family', fontFamily)
        .attr('fill', (d, i) => d === goal[i] ? matchColor: nonMatchColor)
        .text((d) => d);
};

let move = function(chr, x, y) {
    chr.dims.x += x;
    chr.dims.y += y;
    chr.group.transition().duration(1000).attr("transform", `translate(${chr.dims.x}, ${chr.dims.y})`);
};

function Chromosome(svg, dims, text) {
    this.dims = dims;
    this.text = typeof (text) === "string" ? text.split(''): text;


    this.svg = svg;
    this.group = this.svg.append("g")
              .attr("transform", `translate(${this.dims.x}, ${this.dims.y})`);

    this.gene = this.group.append("g");

    update(this);
}

function ChromosomeCrossover(svg, a, b, separator) {
    let firstChildP1 = new Chromosome(svg, a.dims, a.text.slice(0, separator));
    move(firstChildP1, 0, 2 * (30 + height));

    let f2dims = {'x': (width+1)*separator, y:30 + height};
    let firstChildP2 = new Chromosome(svg, f2dims, b.text.slice(separator));
    move(firstChildP2, 0, 30 + height);
}