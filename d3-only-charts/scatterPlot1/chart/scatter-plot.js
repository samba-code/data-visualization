/* global d3 */

const convertToCelcius = (x) => x - 273.15;

const drawScatterPlot = async () => {
  const rawData = await d3.json("./weather-data.json");
  const { hourly } = rawData;
  const dataset = hourly.map((hour) => {
    return {
      temp: +convertToCelcius(hour.temp).toFixed(2),
      humidity: hour.humidity,
    };
  });
  const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9]);
  let dimensions = {
    width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 100,
      left: 100,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const yAccessor = (d) => d.temp;
  const xAccessor = (d) => d.humidity;

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
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  bounds
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("fill", "skyblue")
    .attr("r", 6);

  const tooltip = d3.select("#tooltip");

  function onMouseEnter(event, d) {
    console.log("event: ", event);
    tooltip.style("opacity", 1);
    tooltip.style("display", "flex");
    // const selection = d3.select(event.currentTarget);
    tooltip.select("#temperature").text(`${d.temp}°`);
    tooltip.select("#humidity").text(`${d.humidity}`);
    const x = xScale(d.humidity);
    const y = yScale(d.temp);
    console.log("current target: ", x, y);
    tooltip.style(
      "transform",
      `translate(calc(100% + ${x}px - 267px), calc(100% + ${y}px - 275px))`
    );
    bounds
      .append("circle")
      .attr("class", "tooltip-dot")
      .attr("cx", xScale(xAccessor(d)))
      .attr("cy", yScale(yAccessor(d)))
      .attr("r", 6)
      .style("fill", "maroon")
      .style("pointer-events", "none");
  }

  const delaunay = d3.Delaunay.from(
    dataset,
    (d) => xScale(xAccessor(d)),
    (d) => yScale(yAccessor(d))
  );

  const voronoi = delaunay.voronoi();
  voronoi.xmax = dimensions.boundedWidth;
  voronoi.ymax = dimensions.boundedHeight;

  bounds
    .selectAll(".voronoi")
    .data(dataset)
    .join("path")
    .attr("class", "voronoi")
    .attr("d", (d, i) => voronoi.renderCell(i))
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave);

  console.log(delaunay);

  function onMouseLeave() {
    tooltip.style("opacity", 0);
    tooltip.style("display", "none");
    d3.selectAll(".tooltip-dot").remove();
  }

  const xAxisGenerator = d3.axisBottom().scale(xScale);

  bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translate(0px,${dimensions.boundedHeight}px)`)
    .selectAll("text")
    .style("text-anchor", "middle")
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
    .attr("x", -dimensions.boundedWidth / 2)
    .attr("y", -60)
    .attr("fill", "black")
    .style("font-size", "14px")
    .text("Temperature")
    .attr("transform", "rotate(-90)")
    .style("font-family", "sans-serif")
    .style("text-anchor", "middle");

  bounds
    .append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.boundedHeight + 50)
    .attr("fill", "black")
    .style("font-size", "14px")
    .text("Humidity")
    .style("font-family", "sans-serif")
    .style("text-anchor", "middle");
};

drawScatterPlot();
