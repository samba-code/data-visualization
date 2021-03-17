import React from "react";
import { render } from "enzyme";
import ProjectCard from "../ProjectCard";

describe("ProjectCard", () => {
  it("ProjectCard to match snapshot", () => {
    const wrapper = render(<ProjectCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
