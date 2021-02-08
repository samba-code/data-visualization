/* global d3 */

const convertToCelcius = (x) => x - 273.15;

const drawLineChart = async () => {
  const rawData = await d3.json("./weather-data.json");
  console.log("data: ", rawData);
  const { hourly } = rawData;
  const dailyTemps = hourly.map((hour, i) => { 
    return {
      temp: +convertToCelcius(hour.temp).toFixed(2),
      hour: i + 1,
      feelsLike: +convertToCelcius(hour.feels_like).toFixed(2)
    };
  });
  console.log(dailyTemps);
  const width = 800;
  let dimensions = {
    width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 250,
      left: 100,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const yAccessor = (d) => d.temp;
  const yAccessorFeelsLike = (d) => d.feelsLike;
  const xAccessor = (d) => d.hour;

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const bounds = wrapper
    .append("g")
    .style("transform", `translate(100px, ${dimensions.margin.top}px)`);

  const combinedTemps = [...dailyTemps.map(d => d.temp), ...dailyTemps.map(d => d.feelsLike)];

  

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dailyTemps, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(combinedTemps))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const minY = yScale.domain()[0];

  const lineGenerator = d3.area()
    .curve(d3.curveMonotoneX)
    .x(d => xScale(xAccessor(d)))
    .y1(d => yScale(yAccessor(d)))
    .y0(() => yScale(minY))

    const lineGenerator2 = d3.area()
    .curve(d3.curveMonotoneX)
    .x(d => xScale(xAccessor(d)))
    .y1(d => yScale(yAccessorFeelsLike(d)))
    .y0(() => yScale(minY))

  const line = bounds.append("path")
    .attr("d", lineGenerator(dailyTemps))
    .attr("fill", "skyblue")
    .attr("fill-opacity", "0.6")
    .attr("stroke", "lightblue")
    .attr("stroke-width", 0)

    const line2 = bounds.append("path")
    .attr("d", lineGenerator2(dailyTemps))
    .attr("fill", "blue")
    .attr("fill-opacity", "0.6")
    .attr("stroke", "blue")
    .attr("stroke-width", 0)

  const xAxisGenerator = d3.axisBottom().scale(xScale);

  bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translate(0px,${dimensions.boundedHeight}px)`)
    .selectAll("text")
    .attr("transform", "rotate(-90) translate(-12, -12)")
    .style("text-anchor", "end")
    .style("font-size", "12px");

  const yAxisGenerator = d3
    .axisLeft()
    .scale(yScale)
    .tickFormat(function (d) {
      return d + "°C";
    });

  bounds
    .append("g")
    .call(yAxisGenerator)
    .selectAll("text")
    .style("font-size", "12px");

  bounds
    .append("text")
    .attr("x", -65)
    .attr("y", -75)
    .attr("fill", "black")
    .style("font-size", "14px")
    .text("Temperature")
    .attr("transform", "rotate(-90)")
    .style("font-family", "sans-serif")
    .style("text-anchor", "end");

    bounds
    .append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.boundedHeight + 50)
    .attr("fill", "black")
    .style("font-size", "14px")
    .text("Hours")
    .style("font-family", "sans-serif")
    .style("text-anchor", "middle");
};

drawLineChart();
