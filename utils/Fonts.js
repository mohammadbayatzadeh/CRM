import localFont from "next/font/local";

export const Irancell = localFont({
  src: [
    {
      path: "../public/fonts/Irancell-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Irancell-Regular.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Irancell-Bold.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Irancell-Extrabold.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});
