import React from "react";

import { Flex } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      <h1 style={{fontSize:40}}>IF-GPT</h1>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
