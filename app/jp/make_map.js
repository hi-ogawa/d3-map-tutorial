require("./style.scss");

import d3 from "d3";
import _ from "lodash";

var states = require("./states_jp.json");
var neighborhoods = require("./odigo_neighborhoods.json");

_.each(states.features, (d) => {
    let n = _.find(neighborhoods, (n) => n.name === d.properties.name);
    d.properties.odigo_neighborhood_link = `http://odigo.travel/neighborhoods/${n.id}`;
});

var okinawaSeperation = true;

var w = 1000, h = 1000;

var path = (center, scale) => {

    var projection = d3.geo.albers()
        .rotate([-center.lng, 0         ])
        .center([0,           center.lat])
        .translate([w / 2, h / 2])
        .scale(scale)
        .parallels([26.4604365, 45.3459278]); // from Taketomi(Okinawa) to Wakkanai(Hokkaido)

    return d3.geo.path().projection(projection);
};

// Nagoya
var center = {
    lat: 35.168045,
    lng: 136.8765806
};

var centerForOkinawa = {
    lat: center.lat - 13,
    lng: center.lng - 4
}

var generateDataPath = (selection) => {
    // var bounds = path.bounds(states);
    // var statesWidth  = bounds[1][0] - bounds[0][0];
    // var statesHeight = bounds[1][1] - bounds[0][1];
    // console.log(_.max([statesWidth, statesHeight]));

    selection.attr("d", (d) => {
        if(d.properties.name == "Okinawa" && okinawaSeperation){
            return path(centerForOkinawa, 2500)(d);
        }else{
            return path(center, 2500)(d);
        }
    })
}

function drawSeperationLine(svg){

    var separationLine = {
        "type": "LineString",
        "coordinates": [
            [134.199130, 40.139919],
            [133.642214, 37.917665],
            [131.118658, 36.800716]
        ]
    };

    svg.selectAll(".seperation")
        .data([separationLine])
        .enter()
        .append("path")
        .classed("seperation", true)
        .attr("d", path(center, 2500));
}


export function render(svg){

    // NOTE: http://sarasoueidan.com/blog/svg-coordinate-systems/#svg-viewbox
    //       preserveAspectRatio="xMidYMid meet" is default
    svg.attr("viewBox", `0 0 ${w} ${h}`)
        .classed("jp", true)
        .attr("xlink", "http://www.w3.org/1999/xlink");

    svg.selectAll(".state")
        .data(states.features)
        .enter()
        .append("a")
        .attr("xlink:href", (d) => d.properties.odigo_neighborhood_link)
        .append("path")
        .classed("state", true)
        .attr("data-name", (d) => d.properties.name.toLowerCase())
        .attr("data-region-name", (d) => d.properties.region.toLowerCase())
        .call(generateDataPath);

    if(okinawaSeperation){
        drawSeperationLine(svg)
    }

    // smooth transition as `transform` attribute or `path` value change?
}
