import * as d3 from 'd3';
import style from './index.css';

const graph = document.getElementById('graph');
graph.innerHTML = '<svg width="960" height="500"></svg>';


const svg = d3.select('svg');

const margin = {top: 20, right: 20, bottom: 30, left: 40};
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;

const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

x.domain(d3.range(0, 10, 1));
y.domain(d3.range(0, 100, 1));

const g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const data = [
    {index: 1, frequency: .15},
    {index: 2, frequency: .23},
    {index: 3, frequency: .5},
    {index: 4, frequency: .5},
    {index: 5, frequency: .51},
    {index: 6, frequency: .35},
    {index: 7, frequency: .5},
    {index: 8, frequency: .5},
    {index: 9, frequency: .35},
    {index: 10, frequency: .5}
  ];

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("fill", "deeppink")
    .attr("x", function(d) { return x(d.index); })
    .attr("y", function(d) { return y(d.frequency); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.frequency); });
