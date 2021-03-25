import React from "react";
import { render } from "enzyme";

import Button from "../Button";

describe("Button", () => {
  it("should match snapshot", () => {
    const wrapper = render(<Button>Some text</Button>);
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot in selected state", () => {
    const wrapper = render(<Button selected>Some text</Button>);
    expect(wrapper).toMatchSnapshot();
  });
});
