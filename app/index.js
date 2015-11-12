require("./index.scss");
import d3 from "d3";

var svgJP = d3.select("body").append("svg")
    .attr("width",  750)
    .attr("height", 750);

import {render as renderJP} from "./jp/make_map.js";
renderJP(svgJP);

var svgUK = d3.select("body").append("svg")
    .attr("width", 800)
    .attr("height", 800);

import {render as renderUK} from "./uk/make_map";
renderUK(svgUK);
