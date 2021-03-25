import React from "react";

import ProjectCard from "./ProjectCard";

export default {
  title: "Molecules/ProjectCard",
  component: ProjectCard,
  parameters: {
    backgrounds: {
      default: "mid",
      values: [{ name: "mid", value: "#CCC" }],
    },
  },
};

const Template = (args) => <ProjectCard {...args} />;

export const Story1 = Template.bind({});
Story1.args = {};
