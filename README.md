# React Data Fetching examples

This repository contains the same application in three different flavors:

- as a Next.js application
- as a single page application using TanStack Query with Suspense (and React Router for Routing)
- as a single page application using React Router with dataloading and TanStack Query

The purpose of this application is to demonstrate severals ways of "modern" data fetching (and mutations)
in React applications.

## About the application

The application is a simple blog application that needs data from a (http) backend service. For the example I assumed that a
backend already exists that provides a rest api (so no "all-inclusive" fullstack app with Next.js). Also I
had some requirements in mind, that I wanted to implement, to see how good or bad they can be implemented with
each of the stacks. 

The source code is more or less identical in all applications, so it is easy to compare.

Note: in a real application you would structure your source code differently! I only structured
it this way to make comparsion of the single application flavors easier.

## Run the application

**Start the backend**

Inside `backend` start the Express-based backend for the application:

```bash
pnpm install
pnpm dev
```

The backend runs on port 7002. In the console you find some example routes to try if you want to.

**Start the applications**

All the applications can be run in the same way: go to one of the application folders and run:

```bash
pnpm install
pnpm dev
```

They all are using different ports (but share the same backend), so you can run them in parallel:

* Next.js: http://localhost:3000
* SPA with TanStack Query: http://localhost:3100
* SPA React Router with loader/actions) http://localhost:3300

**"Configuring" the application**

To simulate slow API calls and make loading indicators visible, you can set timeouts in 
 `backend-queries.ts` and `server-actions.ts` files. See the comments at the top of these files on how to enable them.

# Questions, comments, feedback

If you have questions or commments, please feel free to open an issue here in this directory.

You can also reach and follow me on [several platforms](https://nilshartmann.net/follow-me).