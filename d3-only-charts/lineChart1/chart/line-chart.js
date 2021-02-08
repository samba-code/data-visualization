/* global d3 */

const convertToCelcius = (x) => x - 273.15;

const drawLineChart = async () => {
  const rawData = await d3.json("./weather-data.json");
  console.log("data: ", rawData);
  const { hourly } = rawData;
  const dailyTemps = hourly.map((hour, i) => { 
    return {
      temp: +convertToCelcius(hour.temp).toFixed(2),
      hour: i + 1
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
  const xAccessor = (d) => d.hour;

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const bounds = wrapper
    .append("g")
    .style("transform", `translate(100px, ${dimensions.margin.top}px)`);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dailyTemps, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dailyTemps, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

    const freezingTemperaturePlacement = yScale(0)
    const freezingTemperatures = bounds.append("rect")
        .attr("x", 0)
        .attr("width", dimensions.boundedWidth)
        .attr("y", freezingTemperaturePlacement)
        .attr("height", dimensions.boundedHeight
          - freezingTemperaturePlacement)
        .attr("fill", "#e0f3f3")

  const lineGenerator = d3.line()
    .curve(d3.curveMonotoneX)
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))

  const line = bounds.append("path")
    .attr("d", lineGenerator(dailyTemps))
    .attr("fill", "none")
    .attr("stroke", "skyblue")
    .attr("stroke-width", 2)

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
