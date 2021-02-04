/* global d3 */

const currencyToNumber = (x) => Math.round(Number(x.replace(/[^0-9.-]+/g, "")));

const drawBarChart = async () => {
  const rawData = await d3.csv("./political_donations.csv");
  const partiesAndAmounts = rawData.reduce((acc, curr) => {
    if (!acc[curr.RegulatedEntityName + curr.DonorStatus]) {
      acc[curr.RegulatedEntityName + curr.DonorStatus] = {
        party: curr.RegulatedEntityName,
        donorStatus: curr.DonorStatus,
        amount: currencyToNumber(curr.Value),
      };
    } else {
      acc[curr.RegulatedEntityName + curr.DonorStatus] = {
        party: curr.RegulatedEntityName,
        donorStatus: curr.DonorStatus,
        amount:
          acc[curr.RegulatedEntityName + curr.DonorStatus].amount +
          currencyToNumber(curr.Value),
      };
    }
    return acc;
  }, {});

  const partyMax = rawData.reduce((acc, curr) => {
    if (!acc[curr.RegulatedEntityName]) {
      acc[curr.RegulatedEntityName] = {
        total: currencyToNumber(curr.Value),
        runningTotal: 0,
      };
    } else {
      acc[curr.RegulatedEntityName] = {
        total:
          acc[curr.RegulatedEntityName].total + currencyToNumber(curr.Value),
        runningTotal: 0,
      };
    }
    return acc;
  }, {});

  const donorStatusList = {
    "Public Fund": {
      color: "cornflowerblue",
      name: "Public Fund",
    },
    Individual: {
      color: "salmon",
      name: "Individual",
    },
    Trust: {
      color: "grey",
      name: "Trust",
    },
    Company: {
      color: "seaGreen",
      name: "Company",
    },
    "Trade Union": {
      color: "darkseaGreen",
      name: "Trade Union",
    },
    "Friendly Society": {
      color: "gold",
      name: "Friendly Society",
    },
    "Unincorporated Association": {
      color: "pink",
      name: "Unincorporated Association",
    },
  };

  console.log("partyMax: ", partyMax);

  const dataset = Object.keys(partiesAndAmounts)
    .map((party) => {
      const result = {
        party: partiesAndAmounts[party].party,
        donorStatus: partiesAndAmounts[party].donorStatus,
        amount: partiesAndAmounts[party].amount,
        runningTotal: partyMax[partiesAndAmounts[party].party].runningTotal,
        total: partyMax[partiesAndAmounts[party].party].total,
      };
      partyMax[partiesAndAmounts[party].party].runningTotal +=
        partiesAndAmounts[party].amount;
      return result;
    })
    .sort((a, b) => {
      return b.amount - a.amount;
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

  const yAccessor = (d) => d.amount;
  const totalAccessor = (d) => d.total;
  const runningTotalAccessor = (d) => d.runningTotal;
  const xAccessor = (d) => d.party;

  const wrapper = d3
    .select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const bounds = wrapper
    .append("g")
    .style("transform", `translate(100px, ${dimensions.margin.top}px)`);

  const xScale = d3
    .scaleBand()
    .domain(dataset.map((d) => xAccessor(d)))
    .range([0, dimensions.boundedWidth])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, totalAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  bounds
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(xAccessor(d)))
    .attr("y", (d) => {
      return yScale(yAccessor(d) + runningTotalAccessor(d));
    })
    .attr("width", xScale.bandwidth())
    .attr("data-status", (d) => d.donorStatus)
    .attr("height", (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
    .attr("fill", (d) => donorStatusList[d.donorStatus].color);

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
        return "£" + d;
      } else {
        return "0";
      }
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
    .text("Amount in £")
    .attr("transform", "rotate(-90)")
    .style("font-family", "sans-serif")
    .style("text-anchor", "end");

  const legend = bounds
    .append("g")
    .selectAll(".legend")
    .data(Object.values(donorStatusList))
    .enter()
    .append("g")
    .attr("class", "legend");

  legend
    .append("rect")
    .attr("x", dimensions.boundedWidth - 200)
    .attr("y", (_, i) => i * 18)
    .attr("width", 12)
    .attr("height", 12)
    .style("fill", (d) => d.color);

  legend
    .append("text")
    .attr("x", dimensions.boundedWidth - 180)
    .attr("y", (_, i) => i * 18 + 6)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text((d) => d.name)
    .style("font-size", "12px")
    .style("font-family", "sans-serif");
};

drawBarChart();
