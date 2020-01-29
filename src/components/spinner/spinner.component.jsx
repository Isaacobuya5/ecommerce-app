import React from "react";
import { SpinnerOverlay, SpinnerContainer } from "./spinner.styles";

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    // passing it any other props except for the isLoading prop
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
