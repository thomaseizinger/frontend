# Project structure


## `src/components`

Contains generic and reusable components for our application. Think of it like a local `node_modules` folder.

## `src/routes/*/components`

Contains components specific for this route. These components simply provide some abstractions so the main component which gets loaded for the route is not so heavy.
