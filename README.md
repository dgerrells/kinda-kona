## Getting Started

This is a bog standard nextjs app. To get going locally run

```bash
yarn
```

and then

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying

Deployed via vercel integration.

## Design

Idea here is to use the folder base routing nextjs has for both pages and api to keep things simple. We want to leverage routing as much as possible to control what data to display and load.

### API and Data layer

We route based on org, team, and person summaries although there is no person summary implemented. We use server rendered functions to spit out the data into the pages with the logic living in a service layer in the case we need a dedicated api. The data layer is just loading csv into memory and formatting it to be more parsable. Ideally, we would have a JAMstack database.

### Component Lib

We use MUI has it gives us a highly configurable and rich component framework off the shelf. We even have a simple custom theme with dark mode as well.

### Testing

We will add Jest with React testing library at a later point in time. Jest will also work to test the backend functionality.
