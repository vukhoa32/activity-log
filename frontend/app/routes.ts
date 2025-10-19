import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    //   route("about", "routes/about.tsx"), // access via http://localhost:3000/about
    route("about/:pid", "routes/about.tsx"),
    route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
