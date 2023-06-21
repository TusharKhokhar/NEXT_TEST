# About MAS repo

This repo is the common repo that will be used among all the projects

## Installation

### Prerequisites:

- node.js >=14.0.0
- yarn v1
- mysql
- unix-like OS environemnt

### Running locally for dev

- After cloning the repo, you also need to clone the packages folder.
  - `git submodule update --init` clone the mas-packages folder.
- cp `.env.example` to `.env`
- update the DB url and double check all your env variables
- `yarn install` to install all depencencies
- Setting up the db.
  - Run all pending migrations with `yarn workspace intelliKam run migrate`
  - Generate prisma definitions with `yarn workspace intelliKam run generate`
  - Seed prisma definitions with `yarn workspace intelliKam run seed`
- To start the dev server, run `yarn dev`.
- If all went well, you should see a dev server on http://localhost:3001

## Project structure

This repo uses yarn workspaces. Ref: https://classic.yarnpkg.com/en/docs/workspaces/

### Packages

Libraries common to MAS go into the package folder.

#### Creating a new library

- create a new folder inside the packages folder and name it appropriately. e.g. 'XYZ'
- create a `package.json` file. If you're unsure copy from the 'db' folder.
  - set it the same name `XYZ`
  - set the main and types field to `index.ts`
  - If you already have dependencies and their versions, you can put it here.
  - **IMPORTANT** Don't run `yarn add` inside the folder
  - cd back into the root folder, then run `yarn workspace XYZ add ABC` where `ABC` is the package name.
- to use this package, go to the `apps/APP_NAME` folder
  - update package.json dependency array with `ABC: "*"`. Ref `apps/docs/package.json`

### DB updates

- DB is managed by prisma and prismix. **IMPORTANT** Please don't update `prisma.schema` or `base.schema`.
- prismix supports multiple `schema.prisma` files as long as they are in one of the apps or packages folder.
- Run `yarn workspace db run create`. This will create corresponding .sql migration files for your changes.
  - appropriately set a name for the migration.
  - use sql terms like `create, alter, drop, delete` etc. to describe your changes.
  - check the outputted `packages/db/schema.prisma` file to make sure there are no errors in the generated sql files.
  - check the db using a F/E like mysqlworkbench or phpmyadmin to confirm if the changes are actually reflected.

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
