export default {
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
};
