import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { lighten, rem } from "polished";
const ArticalCard = styled.article`
  display: flex;
  box-sizing: border-box;
  min-height: 160px;
  flex-grow: 1;
  flex-shrink: 1;
  align-content: flex-start;
  background: ${(props) => lighten("0.2", props.theme.neutral)};
  margin: 26px 13px 0 13px;
  @media only screen and (max-width: 700px) {
    flex-basis: 100%;
  }
  @media only screen and (min-width: 700px) {
    flex-basis: 40%;
  }
  @media only screen and (min-width: 1200px) {
    flex-basis: 30%;
  }
`;

ArticalCard.defaultProps = {
  theme: {
    neutral: "grey",
  },
};

const CardHeading1 = styled.h1`
  font-size: ${rem("18px")};
  line-height: ${rem("22px")};
  font-weight: bold;
  margin: 0 0 6px 0;
`;

const ProjectText = styled.p`
  font-size: ${rem("16px")};
  line-height: ${rem("20px")};
`;

const ImageHolder = styled.div`
  height: 100%;
  width: 100%;
  background: black;
  flex-basis: 50%;
  flex-grow: 1;
`;

const TextWrapper = styled.div`
  flex-basis: 50%;
  padding: 16px 16px;
  flex-grow: 1;
`;

const ImageFit = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const NoImage = styled.div`
  height: 100%;
  width: 100%;
  background: grey;
`;

const ProjectCard = ({ direction, image, linkedPage, title, description }) => {
  return (
    <ArticalCard direction={direction}>
      <ImageHolder>
        {image ? (
          <ImageFit src={""} alt="Sunset behind mountains." />
        ) : (
          <NoImage />
        )}
      </ImageHolder>
      <TextWrapper>
        <CardHeading1>{title}</CardHeading1>
        <ProjectText>{description}</ProjectText>
        <Link to={linkedPage}>&gt; View Project</Link>
      </TextWrapper>
    </ArticalCard>
  );
};

export default ProjectCard;

ProjectCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  direction: PropTypes.oneOf(["left", "right"]),
  image: PropTypes.string,
  linkedPage: PropTypes.string,
};

ProjectCard.defaultProps = {
  title: "Default Card Title",
  description:
    "This is a description of a project. It contains some detail about the project. This is a description of a project. It contains some detail about the project.",
  image: null,
  linkedPage: "/",
};
