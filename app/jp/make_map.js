require("./style.scss");

import d3 from "d3";
import _ from "lodash";

const states = require("./states_jp.json");
const odigoNeighborhoods = require("./odigo_neighborhoods.json");

export function render(svg){

    var w = svg.property("viewBox").animVal.width;
    var h = svg.property("viewBox").animVal.height;

    svg.classed("jp", true)
        .attr("xlink", "http://www.w3.org/1999/xlink");

    var projection = d3.geo.albers()
        .rotate([-136.8765806, 0])                // Nagoya
        .center([0, 35.168045])
        .translate([w / 2, h / 2])
        .scale(2500)
        .parallels([26.4604365, 45.3459278]);     // from Taketomi(Okinawa) to Wakkanai(Hokkaido)

    var path = d3.geo.path().projection(projection);

    // render states (prefectures)
    svg.selectAll(".state")
        .data(states.features)
        .enter()
        .append("a")

        .attr("xlink:href", (d) => {
            let n = _.find(odigoNeighborhoods, (n) => n.name === d.properties.name);
            return `http://odigo.travel/neighborhoods/${_.get(n, 'id', '')}`;
        })
        // .attr("xlink:show", "new")
        .append("path")
        .classed("state", true)
        .attr("data-name", (d) => d.properties.name.toLowerCase())
        .attr("data-region-name", (d) => d.properties.region.toLowerCase())
        .attr("d", path)
}
