import d3 from "d3";
require("./style.scss");

var subunits = require("./subunits.json");
var subunitNames = require("./subunit_names.json");
var places = require("./places.json");

export function render(svg){

    svg.classed("uk", true);

    // https://en.wikipedia.org/wiki/Map_projection
    // https://en.wikipedia.org/wiki/Albers_projection
    // https://github.com/mbostock/d3/wiki/Geo-Projections#standard-abstract-projection
    var projection = d3.geo.albers()
        .rotate([0, 0])
        .center([-4.3024977, 55.1554403]) // around Glasgow
        .translate([svg.attr("width") / 2, svg.attr("height") / 2])
        .scale(4000)                      // https://en.wikipedia.org/wiki/Scale_(map)#Factor
        .parallels([50, 60]);             // https://github.com/mbostock/d3/wiki/Geo-Projections#conicEqualArea_parallels

    var path = d3.geo.path().projection(projection);

    // render country areas
    svg.selectAll(".subunit")
        .data(subunits.features)
        .enter()
        .append("path")
        .attr("class", (d) => `subunit ${d.properties.SU_A3}`)
        .attr("d", path);

    // render country names
    svg.selectAll("subunit-label")
        .data(subunitNames.features)
        .enter()
        .append("text")
        .attr("class", "subunit-label")
        .attr("transform", (d) => `translate(${projection(d.geometry.coordinates)})`)
        .text((d) => d.properties.sr_subunit)

    // render place points
    svg.append("path")
        .datum(places)
        .attr("d", path.pointRadius(2))
        .attr("class", "place");

    // render place names
    svg.selectAll(".place-label")
        .data(places.features)
        .enter()
        .append("text")
        .attr("class", "place-label")
        .attr("dy", ".23em")
        .attr("x", (d) => d.geometry.coordinates[0] > -1 ? 6 : -6)
        .style("text-anchor", (d) => d.geometry.coordinates[0] > -1 ? "start" : "end")
        .attr("transform", (d) => `translate(${projection(d.geometry.coordinates)})`)
        .text((d) => d.properties.NAME);
}
