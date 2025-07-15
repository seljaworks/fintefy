import React from "react";

import { View } from "react-native";
import SortableList from ".";
import { MARGIN } from "./Config";
import Tile from "./Tile";

const tiles = [
  {
    id: "spent",
  },

  {
    id: "cashback",
  },
  {
    id: "recent",
  },
  {
    id: "cards",
  },
];

const WidgetList = () => {
  return (
    <View style={{ paddingHorizontal: MARGIN }}>
      <SortableList editing={true} onDragEnd={() => {}}>
        {[...tiles].map((tile, index) => (
          <Tile onLongPress={() => true} key={tile.id} id={tile.id} />
        ))}
      </SortableList>
    </View>
  );
};

export default WidgetList;
