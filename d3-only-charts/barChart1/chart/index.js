/* global d3 */
let nowMeasure = "amount";

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

const colorScheme = d3["schemePaired"];
console.log(colorScheme);

const currencyToNumber = (x) => Math.round(Number(x.replace(/[^0-9.-]+/g, "")));

// const toolTip = document.getElementById("toolTip");
const tooltip = d3.select("#toolTip")

function mouseEnter(event, datum) { 
  d3.select(this).transition().style("fill", "lightgrey")
  tooltip
  // TODO - find better way to do this
  .style("left", `${Number(event.target.getAttribute("x")) + 75}px`)
  .style("top", `${Number(event.target.getAttribute("y")) - 5}px`)
  .style("opacity", "100");

  tooltip.select("#toolTipText")
  .text(`£${d3.format(",.0f")(datum[nowMeasure])}`)
}

function mouseLeave(datum) { 
  d3.select(this)
  .transition()
  .style("fill", datum.color);

  tooltip
  .style("opacity", "0");

  tooltip.select("#toolTipText")
  .text("")
}


const drawBarChart = async (currentMeasure) => {

  let dataset;

  const updateBarChart = (newMeasure) => {
    bounds
    .selectAll("rect")
    .transition()
    .duration(600)
    .ease(d3.easeSinInOut)
    .attr("x", (d) => xScale(xAccessor(d)))
    .attr("y", (d) => yScale(yAccessor(d, newMeasure)))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => {
      return dimensions.boundedHeight - yScale(yAccessor(d, newMeasure))})
  };

  const onSelectChange = (e) => {
    const newMeasure = e.currentTarget.value;
    nowMeasure = newMeasure;
    updateBarChart(newMeasure);
  };
  
  const measureSelector = document.getElementById("chartOptions");
  measureSelector.addEventListener("change", onSelectChange);
  
  const yAccessor = (d, m = "amount") => d[m];
  const amountAccessor = (d) => d["amount"];
  const xAccessor = (d) => d.party;

  const rawData = await d3.csv("./political_donations.csv");
  const partiesAndAmounts = rawData
    .filter((d) => d.RegulatedEntityType === "Political Party")
    .reduce((acc, curr) => {
      if (!acc[curr.RegulatedEntityName]) {
        acc[curr.RegulatedEntityName] = currencyToNumber(curr.Value);
      } else {
        acc[curr.RegulatedEntityName] += currencyToNumber(curr.Value);
      }
      return acc;
    }, {});

  const makeDataset = (data) => Object.keys(data)
    .map((party, i) => {
      return {
        party,
        amount: data[party],
        randomAmount: data[party] * Math.random(),
        color: colorScheme[i]
      };
    })
    .sort((a, b) => {
      return b.amount - a.amount;
    });

  dataset = makeDataset(partiesAndAmounts); 

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const bounds = wrapper
    .append("g")
    .attr("class", "barsGroup")
    .style("transform", `translate(100px, ${dimensions.margin.top}px)`);

  const xScale = d3
    .scaleBand()
    .domain(dataset.map((d) => xAccessor(d)))
    .range([0, dimensions.boundedWidth])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, amountAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

   const bars = bounds
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(xAccessor(d)))
    .attr("y", (d) => { 
      return dimensions.boundedHeight})
    .attr("width", xScale.bandwidth())
    .attr("height", "0")
    .attr("fill", (d) => d.color);

    bars
    .transition()
    .duration(1000)
    .attr("x", (d) => xScale(xAccessor(d)))
    .attr("y", (d) => { 
      return yScale(yAccessor(d, currentMeasure))})
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => {
      return dimensions.boundedHeight - yScale(yAccessor(d, currentMeasure))})

    bars
    .on("mouseenter", mouseEnter)
    .on("mouseleave", mouseLeave)

  const xAxisGenerator = d3.axisBottom().scale(xScale).tickSize(0);

  bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translate(0px,${dimensions.boundedHeight}px)`)
    .selectAll("text")
    .attr("transform", "rotate(-90) translate(-12, -8)")
    .style("text-anchor", "end")
    .style("font-size", "12px");

  const yAxisGenerator = d3
    .axisLeft()
    .scale(yScale)
    .tickFormat(function (d) {
      if (d > 0) {
        return "£" + d3.format(",.0f")(d);
      } else {
        return "0";
      }
    });

  bounds
    .append("g")
    .attr("class", "yAxisText")
    .call(yAxisGenerator)
    .selectAll("text")

  bounds
    .append("text")
    .attr("class", "yAxisLabel")
    .attr("x", -65)
    .attr("y", -75)
    .attr("fill", "black")
    .text("Amount in £")
    .attr("transform", "rotate(-90)")

};

drawBarChart("amount");
