import React from "react";
import { withRouter } from "react-router-dom";
import { GridList, Avatar } from "@material-ui/core";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "../AppAsset/CSS/CategoryCard.css";
import { ROUTE_SUBCATEGORIES } from "../Constant";

const CategoryCard = ({ data = [], history }) => {
  const onClickHandler = (id) => {
    history.push(`${ROUTE_SUBCATEGORIES}/${id}`);
  };
  return (
    <div className="categoryCardContainer">
      <GridList cellHeight={180} className="categoryCards">
        {data.map((tile) => (
          <GridListTile key={tile.id} onClick={() => onClickHandler(tile.id)}>
            <img src={tile.bg_image} alt={tile.name}  />
            <GridListTileBar
              title={                  
                <div className="categoryIcon">
                  <Avatar alt="icon" src={tile.icon} />
                </div>
              }
              subtitle={
                <div>
                  <span style={{ textAlign: "left", whiteSpace: "break-spaces" }}>
                    <h4 style={{fontWeight:"normal"}}>{tile.name}</h4>
                  </span>
                </div>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default withRouter(CategoryCard);
