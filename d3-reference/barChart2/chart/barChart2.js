/* global d3 */
const MAX_ITEMS = 35;
const currencyToNumber = (x) => Math.round(Number(x.replace(/[^0-9.-]+/g, "")));

const drawBarChart = async () => {
  const rawData = await d3.csv("./political_donations.csv");
  console.log("rawData: ", rawData);
  const partiesAndAmounts = rawData
    .filter(
      (d) =>
        d.RegulatedEntityType === "Political Party" &&
        d.DonorStatus !== "Public Fund"
    )
    .reduce((acc, curr) => {
      if (!acc[curr.DonorName]) {
        acc[curr.DonorName] = {
          amount: currencyToNumber(curr.Value),
          party: curr.RegulatedEntityName,
        };
      } else {
        acc[curr.DonorName] = {
          amount: acc[curr.DonorName].amount + currencyToNumber(curr.Value),
          party: curr.RegulatedEntityName,
        };
      }
      return acc;
    }, {});

  const dataset = Object.keys(partiesAndAmounts)
    .map((donor) => {
      return {
        donor,
        amount: partiesAndAmounts[donor].amount,
        party: partiesAndAmounts[donor].party,
      };
    })
    .sort((a, b) => {
      return b.amount - a.amount;
    })
    .slice(0, MAX_ITEMS);
  console.log("dataset: ", dataset);
  const width = 1000;
  let dimensions = {
    width,
    height: 800,
    margin: {
      top: 30,
      right: 10,
      bottom: 250,
      left: 350,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const xAccessor = (d) => d.amount;
  const yAccessor = (d) => d.donor;

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

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, xAccessor)])
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3
    .scaleBand()
    .domain(dataset.map((d) => yAccessor(d)))
    .range([0, dimensions.boundedHeight])
    .padding(0.5);

  console.log("domain: ");

  const gridGenerator = d3
    .axisBottom()
    .scale(xScale)
    .tickSize(-dimensions.boundedHeight, 0, 0)
    .tickFormat("");

  bounds
    .append("g")
    .call(gridGenerator)
    .style("transform", `translate(0px,${dimensions.boundedHeight}px)`)
    .selectAll("line")
    .style("stroke", "#CCC");

  bounds
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d) => yScale(yAccessor(d)))
    .attr("width", (d) => xScale(xAccessor(d)))
    .attr("height", yScale.bandwidth())
    .attr("fill", (d) => {
      console.log(d);
      if (d.party === "Labour Party") {
        return "red";
      } else if (d.party === "Conservative and Unionist Party") {
        return "blue";
      } else if (d.party === "Liberal Democrats") {
        return "yellow";
      } else {
        return "grey";
      }
    });

  const xAxisGenerator = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat(function (d) {
      if (d > 0) {
        return "£" + d;
      } else {
        return "0";
      }
    });

  bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translate(0px,${dimensions.boundedHeight}px)`)
    .selectAll("text")
    .attr("transform", "rotate(-90) translate(-12, -8)")
    .style("text-anchor", "end")
    .style("font-size", "12px");

  const yAxisGenerator = d3.axisLeft().scale(yScale);

  bounds
    .append("g")
    .call(yAxisGenerator)
    .selectAll("text")
    .style("font-size", "12px");

  bounds
    .append("text")
    .attr("x", -dimensions.boundedHeight / 2)
    .attr("y", -230)
    .attr("fill", "black")
    .style("font-size", "14px")
    .text("Amount in £")
    .attr("transform", "rotate(-90)")
    .style("font-family", "sans-serif")
    .style("text-anchor", "middle");
};

drawBarChart();
