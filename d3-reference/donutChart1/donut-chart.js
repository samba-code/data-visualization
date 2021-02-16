/* global d3 */

const drawDonutChart = async () => {
  const rawData = await d3.json("./weather-data.json");
  const { hourly } = rawData;

  const weatherData = hourly.reduce((acc, curr) => {
    const description = curr.weather[0].description;
    if (!acc[description]) {
      acc[description] = {
        description,
        count: 1,
      };
    } else {
      acc[description] = {
        description,
        count: acc[description].count + 1,
      };
    }
    return acc;
  }, {});

  const dataset = Object.values(weatherData);

  const width = 800;
  let dimensions = {
    width,
    height: width * 0.6,
    margin: {
      top: 200,
      right: 10,
      bottom: 250,
      left: 300,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const radius = dimensions.boundedWidth / 4;
  const colorScale = d3.scaleOrdinal([
    "#4daf4a",
    "#377eb8",
    "#ff7f00",
    "#984ea3",
    "#e41a1c",
  ]);

  const pie = d3.pie().value((d) => d.count);

  var path = d3
    .arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 60);

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const bounds = wrapper
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  var segments = bounds
    .selectAll(".segment")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "segment");

  segments
    .append("path")
    .attr("d", path)
    .attr("fill", (d, i) => colorScale(i));

  // Text translation calculation from here: http://bl.ocks.org/clayzermk1/4290070
  segments
    .append("text")
    .style("font-family", "sans-serif")
    .style("font-size", "14px")
    .attr("transform", function (d) {
      return (
        "translate(" +
        (radius - 12) *
          Math.sin((d.endAngle - d.startAngle) / 2 + d.startAngle) +
        "," +
        -1 *
          (radius - 12) *
          Math.cos((d.endAngle - d.startAngle) / 2 + d.startAngle) +
        ")"
      );
    })
    .attr("dy", ".35em")
    .style("text-anchor", function (d) {
      var rads = (d.endAngle - d.startAngle) / 2 + d.startAngle;
      if (
        (rads > (7 * Math.PI) / 4 && rads < Math.PI / 4) ||
        (rads > (3 * Math.PI) / 4 && rads < (5 * Math.PI) / 4)
      ) {
        return "middle";
      } else if (rads >= Math.PI / 4 && rads <= (3 * Math.PI) / 4) {
        return "start";
      } else if (rads >= (5 * Math.PI) / 4 && rads <= (7 * Math.PI) / 4) {
        return "end";
      } else {
        return "middle";
      }
    })
    .text(function (d) {
      return d.data.description;
    });
};

drawDonutChart();
