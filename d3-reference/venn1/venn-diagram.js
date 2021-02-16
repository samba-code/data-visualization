/* global d3 venn */

const drawVenn = async () => {
  const width = 800;
  let dimensions = {
    width,
    height: width * 0.6,
    margin: {
      top: 50,
      right: 10,
      bottom: 250,
      left: 50,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  var sets = [
    { sets: ["A"], size: 12 },
    { sets: ["B"], size: 12 },
    { sets: ["C"], size: 12 },
    { sets: ["A", "B"], size: 2 },
    { sets: ["B", "C"], size: 2 },
    { sets: ["C", "A"], size: 2 },
  ];

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

  var chart = venn.VennDiagram();
  bounds.datum(sets).call(chart);

  bounds
    .selectAll("text")
    .style("fill", "white")
    .style("font-family", "sans-serif")
    .style("font-size", "25px");
};

drawVenn();
