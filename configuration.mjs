import Color from "color";
export const genColors = (color) => {
  const ins = Color(color);
  return [
    ins.lighten(0.6).hex(),
    ins.lighten(0.5).hex(),
    ins.lighten(0.4).hex(),
    ins.lighten(0.3).hex(),
    ins.lighten(0.2).hex(),
    ins.lighten(0.1).hex(),
    ins.hex(),
    ins.darken(0.1).hex(),
    ins.darken(0.2).hex(),
    ins.darken(0.3).hex(),
  ];
};
export const grayColor = (color) => {
  const ins = Color(color);
  return ins.grayscale().hex();
};
const configuraton = {
  BasePath: "/bmm-dev",
  PathAlias: {
    Admin: {
      Pattern: /^\/admin\//,
      Root: "/admin/index",
      Login: "/admin/login",
    },
  },
  Settings: {
    locale: "en", // en, da, de, el, es, fr, hu, it, ja, pl, pt, ru, sv, tr, zh
    theme: "light", // light, dark, auto
    menu: "vertical", // vertical, collapsible-vertical, horizontal
    layout: "full", // full, boxed-layout
    rtlClass: "ltr", // rtl, ltr
    animation: "", // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
  },
  AuthField: "token",
  Colors: {
    Primary: "#1badaa",
    Secondary: "#018ACB",
    Success: "#3ab078",
    Danger: "#FF7878",
    Warning: "#FFD966",
    Info: "#DBA979",
  },
};
export default configuraton;
export const PrimaryColors = genColors(configuraton.Colors.Primary);
