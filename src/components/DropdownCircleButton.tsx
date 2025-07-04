import React from "react";
import { StyleSheet } from "react-native";

import * as DropdownMenu from "zeego/dropdown-menu";
import RoundedBtn from "./RoundedBtn";

const DropdownCircleButton = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundedBtn iconName="ellipsis-horizontal" title="More" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        <DropdownMenu.Item key="converter">
          <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Background</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Add New Account</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const styles = StyleSheet.create({});

export default DropdownCircleButton;
