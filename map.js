class Map {
  constructor({width, height, scale}) {
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.projection = this.createProjection();
    this.path = this.createPath();
    this.svg = this.createSVG();
    this.addData();
  }

  createPath() {
    return d3.geo.path().projection(this.projection);
  }

  createProjection() {
    return d3.geo.albersUsa()
      .translate([this.width/2, this.height/2])
      .scale([this.scale]);
  }

  createSVG() {
    return d3.select("body")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height);
  }

  addData() {
    d3.json("us-states.json", function(json) {
      this.svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", this.path)
      .style("fill", "steelblue");
      //.on("click", clicked);
    }.bind(this));
  }
}

// const clicked = function(polygon) {
//   var x, y, zoom, center;
//   zoom = 1;
//   if (polygon && center !== polygon) {
//     var centroid = path.centroid(polygon);
//     x = centroid[0];
//     y = centroid[1];
//     center = polygon;
//   } else {
//     x = width / 2;
//     y = height / 2;
//     center = null;
//   }

//   g.selectAll("path")
//   .classed("active", center && function(polygon) { return polygon === center; });

//   g.transition()
//   .duration(750)
//   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + zoom + ")translate(" + -x + "," + -y + ")")
//   .style("stroke-width", 1.5 / zoom + "px");
// }