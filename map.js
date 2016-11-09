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
    return d3.select("#map")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .attr("id", "states")
  }

  addData() {
    d3.json("us-states.json", function(json) {
      this.svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", this.path)
      .attr("data-name", function(d) {
                      return d.properties.name
                   })
      .on("click", this.setActive.bind(this));
    }.bind(this));
  }

  setActive(clicked) {
    this.svg.selectAll("path")
    .classed("active", (polygon) => { return polygon === clicked; })

    const selected = this.svg.selectAll(".active")
    this.showInfo(selected[0][0])
  }

  showInfo(selected) {
    const element = document.querySelector("#info")
    element.style.visibility = "visible"
    let span = element.children[0]
    span.innerText = selected.getAttribute('data-name')
  }
}