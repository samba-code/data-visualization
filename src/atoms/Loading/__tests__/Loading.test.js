import React from "react";
import { render } from "enzyme";

import Loading from "../Loading";

describe("Loading", () => {
  it("should match snapshot", () => {
    const wrapper = render(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
