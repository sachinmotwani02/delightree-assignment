import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  // semanticTokens: {
  //   colors: {
  //     background: {
  //       pressed: {
  //         base: { default: "blue.800", _dark: "blue.300" },
  //         subtle: { default: "blue.300", _dark: "blue.700" },
  //       },
  //     },
  //   },
  // },
});
export default theme;
