import React from "react";
import { render } from "enzyme";

import MainContent from "../MainContent";

describe("MainContent", () => {
  it("should match snapshot", () => {
    const wrapper = render(<MainContent>Some Content</MainContent>);
    expect(wrapper).toMatchSnapshot();
  });
});
