import React from "react";

import { Box } from "../design-system/components/Flexbox";
import HomeModule from "../module_home/Home.styled";

const HomePage: React.FC = () => {
  return (
    <Box style={{ width: "100vw", height: "100vh" }}>
      <HomeModule />
    </Box>
  );
};

export default HomePage;
