/*
    Filename: ComplexCodeExample.js
    Description: This complex code example showcases a sophisticated JavaScript application.
    It is a real-time stock market data visualization tool using React and D3.js libraries.
    It fetches stock data from an API, processes it, and displays it in a beautiful chart.

    Note: This code example is an abstraction and may not work out-of-the-box.
*/

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const ComplexStockMarketChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/stock-market-data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching stock market data:', error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // D3.js data processing and visualization code
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const x = d3
        .scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([d3.min(data, d => d.price), d3.max(data, d => d.price)])
        .range([height, 0]);

      const line = d3
        .line()
        .x(d => x(d.date))
        .y(d => y(d.price))
        .curve(d3.curveNatural);

      const svg = d3
        .select('#stock-market-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);
      
      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .select('.domain')
        .remove();
      
      svg.append('g').call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div id="stock-market-chart">
      {
        data.length === 0
          ? <p>Loading stock market data...</p>
          : null
      }
    </div>
  );
};

export default ComplexStockMarketChart;