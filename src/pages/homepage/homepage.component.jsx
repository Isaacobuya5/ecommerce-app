import React from "react";
import Directory from "../../components/directory/directory.component";

import { HomePageContainer } from "./homepage.styles";

// This component will be used only once- the reason why it is not in the components folder
const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
