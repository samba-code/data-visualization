/* global d3 */

const convertToCelcius = (x) => x - 273.15;

const drawLineChart = async () => {
  const rawData = await d3.json("./weather-data.json");
  const { hourly } = rawData;
  const dailyTemps = hourly.map((hour, i) => {
    return {
      temp: +convertToCelcius(hour.temp).toFixed(2),
      hour: i + 1,
    };
  });
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

  const freezingTemperaturePlacement = yScale(0);
  const freezingTemperatures = bounds
    .append("rect")
    .attr("x", 0)
    .attr("width", dimensions.boundedWidth)
    .attr("y", freezingTemperaturePlacement)
    .attr("height", dimensions.boundedHeight - freezingTemperaturePlacement)
    .attr("fill", "#e0f3f3");

  const lineGenerator = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  const line = bounds
    .append("path")
    .attr("d", lineGenerator(dailyTemps))
    .attr("fill", "none")
    .attr("stroke", "skyblue")
    .attr("stroke-width", 2);

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

  const listenerRect = bounds
    .append("rect")
    .attr("class", "listener-rect")
    .attr("width", dimensions.boundedWidth)
    .attr("height", dimensions.boundedHeight)
    .on("mouseenter", onMouseEnter)
    .on("mousemove", onMouseMove)
    .on("mouseleave", onMouseLeave);

  const tooltip = d3.select("#tooltip");

  const getDistanceFromHoveredDate = (d, hoveredDate) => {
    return Math.abs(xAccessor(d) - hoveredDate);
  };

  function onMouseEnter() {
    tooltip.style("opacity", 1);
    tooltipCircle.style("opacity", 1);
  }

  const tooltipCircle = bounds
    .append("circle")
    .attr("class", "tooltip-circle")
    .attr("r", 4)
    .style("opacity", 0);

  const lineToYAxis = bounds
    .append("line")
    .attr("class", "line-to-y")
    .attr("x0", 0)
    .attr("x1", dimensions.boundedWidth)
    .attr("y1", 0)
    .attr("y2", 0)
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .style("opacity", 0);

  function onMouseMove(event, d) {
    const mousePosition = d3.pointer(event);
    const hoveredDate = xScale.invert(mousePosition[0]);
    const closestIndex = d3.leastIndex(dailyTemps, (a, b) => {
      return (
        getDistanceFromHoveredDate(a, hoveredDate) -
        getDistanceFromHoveredDate(b, hoveredDate)
      );
    });

    const closestDataPoint = dailyTemps[closestIndex];

    tooltip.select("#hour").text(xAccessor(closestDataPoint));
    tooltip
      .select("#temperature")
      .text(d3.format(".1f")(yAccessor(closestDataPoint)) + "°C");

    const x = xScale(xAccessor(closestDataPoint)) + dimensions.margin.left;
    const y = yScale(yAccessor(closestDataPoint)) + dimensions.margin.top;
    tooltip.style(
      "transform",
      `translate(calc(-50% + ${x}px), calc(${y}px + 20%) )`
    );

    lineToYAxis
      .attr("x0", 0)
      .attr("x1", x - dimensions.margin.left)
      .attr("y1", y - dimensions.margin.top)
      .attr("y2", y - dimensions.margin.top)
      .style("opacity", 0.5);

    tooltipCircle
      .attr("cx", xScale(xAccessor(closestDataPoint)))
      .attr("cy", yScale(yAccessor(closestDataPoint)))
      .style("pointer-events", "none")
      .attr("fill", "blue");
  }

  function onMouseLeave() {
    tooltip.style("opacity", 0);
    tooltipCircle.style("opacity", 0);
    lineToYAxis.style("opacity", 0);
  }
};

drawLineChart();
