
//Bar Chart of the frequency of the words per year, you can select options on the graph to specify a certain month 

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 1000;
    const height = 400;
    const svg = d3.select(svgRef.current)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  
    // Set up scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.word))
      .range([0, width])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.frequency)])
      .range([height, 0]);
  
    // Create and style the bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.word))
      .attr('y', d => yScale(d.frequency))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.frequency))
      .attr('fill', 'steelblue');
  
    // Add axes
    svg.append('g')
      .call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${height})`);
  
    svg.append('g')
      .call(d3.axisLeft(yScale));
  }, [data]);


  return (
    <div className="word-frequency-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
  