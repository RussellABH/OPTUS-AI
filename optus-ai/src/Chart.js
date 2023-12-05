
//Bar Chart of the frequency of the words per year, you can select options on the graph to specify a certain month 

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 1500;
    const height = 1000;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // Set up scales for a horizontal bar chart
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.word))
      .range([0, height])
      .padding(0.1);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.frequency) + 50])
      .range([0, width / 2]);

    // Create and style the bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', d => yScale(d.word))
      .attr('width', d => xScale(d.frequency))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'steelblue');

    // Add text labels for each bar
    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => d.word)
      .attr('x', 5) // Adjust the position as needed
      .attr('y', d => yScale(d.word) + yScale.bandwidth() / 2)
      .style('alignment-baseline', 'middle');

    // Add frequencies to the right of each bar
    svg.selectAll('.frequency-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'frequency-label')
      .text(d => d.frequency)
      .attr('x', d => xScale(d.frequency) + 10) // Adjust the position as needed
      .attr('y', d => yScale(d.word) + yScale.bandwidth() / 2)
      .style('alignment-baseline', 'middle')
      .style('font-size', '12px')
      .style('fill', 'white'); // Set text color to white
    
    // Add axes
    //Y-Axis
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
