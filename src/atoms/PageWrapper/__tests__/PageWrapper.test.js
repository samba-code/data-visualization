import React from "react";
import { render } from "enzyme";

import PageWrapper from "../PageWrapper";

describe("PageWrapper", () => {
  it("should match snapshot", () => {
    const wrapper = render(<PageWrapper>Some Content</PageWrapper>);
    expect(wrapper).toMatchSnapshot();
  });
});
