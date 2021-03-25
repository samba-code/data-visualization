import { reshapeData } from "../reshapeData";
import { weatherDataInput } from "../__mocks__/weatherDataInput";
import { weatherDataOutput } from "../__mocks__/weatherDataOutput";

describe("reshapeData", () => {
  it("should reshape weather input data to correct output format", () => {
    const reshapedData = reshapeData(weatherDataInput);
    expect(JSON.parse(reshapedData)).toEqual(weatherDataOutput);
  });
});
