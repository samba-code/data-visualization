import React from "react";
import { render } from "enzyme";

import Paragraph from "../Paragraph";

describe("Paragraph", () => {
  it("should match snapshot", () => {
    const wrapper = render(<Paragraph>Some text</Paragraph>);
    expect(wrapper).toMatchSnapshot();
  });
});
