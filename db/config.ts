import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    email: column.text({ optional: false }),
    pasword: column.text({ optional: false }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({  optional: false, unique: true }),
    userId: column.text({ optional: false, references: ()=>User.columns.id }),
    expiresAt: column.number({ optional: false }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {User, Session},
});
