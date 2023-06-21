# DB

### We use [Prisma](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#:~:text=StartedConceptsGuides-,Reference,-SupportAbout) to create, maintain, query our DB

### [Prismix](https://github.com/jamiepine/prismix) is used to merge different schema

- Install dependencies if not done
- remove old schema file if present
- setup .env if not done
- generate schema.prisma
- deploy any changes

```bash
# __demo__ is your web app
yarn workspace __demo__ run generate
yarn workspace __demo__ run migrate
```

If everything went fine, you should see a "User" table in your DB. Check with phpMyAdmin or MySQL workbench.

## Creating/Updating schema

- you can create a new schema file and include it in `prismix.config.json`
- you can also update base.schema or _yourown.schema_ with new rows and models
- delete old schema
- after doing changes, new migrations have to be created

```bash
yarn workspace __demo__ run create
```

- the above command will create new migration as .sql files.
- check the .sql files for any errors.
- when you rename a column, then prisma will dlete the old column and create new ones. In this case it is important to fix the .sql file ourselves.

_Note:_

- **DO NOT** touch or edit `schema.prisma`. All changes should either be done in base.schema or other schema files
- You can create a DB row in User table and then use docs app to check. After running the docs app, open `/api/users`. It would return the list of users
- Checkout `apps/docs/pages/api/users.ts` for reference
