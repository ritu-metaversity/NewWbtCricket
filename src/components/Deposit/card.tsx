import React, { FC } from "react";
import { Typography } from "@mui/material";
import { CardContainer, CardImg } from "./styledComponents";

interface Props {
  selected?: any;
  details: any;
  handleClick?: () => any;
}
const Card: FC<Props> = ({ selected, handleClick, details }) => {
  return (
    <CardContainer onClick={handleClick} className={selected ? "selected" : ""}>
      <CardImg src={details.image} />
      <Typography textAlign={"center"}>{details.methodName}</Typography>
    </CardContainer>
  );
};

export default Card;
