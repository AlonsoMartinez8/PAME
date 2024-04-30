import { defineDb, defineTable, column } from "astro:db";

const User = defineTable({
  deprecated: true,
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ optional: false, unique: true }),
    password: column.text({ optional: false }),
    imageUrl: column.text({optional: true}),
    description: column.text({optional: true}),
    link: column.text({optional: true}),
  },
});

const UserNew = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ optional: false, unique: true }),
    password: column.text({ optional: false }),
    imageUrl: column.text({optional: true}),
    description: column.text({optional: true}),
    link: column.text({optional: true}),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {User, Session, UserNew},
});
