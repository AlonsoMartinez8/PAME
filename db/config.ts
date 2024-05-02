import { defineDb, defineTable, column } from "astro:db";

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
  },
});

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    wardrobeId: column.text({
      optional: false,
      references: () => Wardrobe.columns.id,
    }),
    outfitId: column.text({
      optional: false,
      references: () => Outfit.columns.id,
    }),
    username: column.text({ optional: false, unique: true }),
    password: column.text({ optional: false }),
    imageUrl: column.text({ optional: true }),
    description: column.text({ optional: true }),
    link: column.text({ optional: true }),
    location: column.text({ optional: true }),
    birthdate: column.text({ optional: true }),
  },
});

const Wardrobe = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    public: column.boolean({ optional: false, default: false }),
  },
});

const Clothe = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    wardrobeId: column.text({
      optional: false,
      references: () => Wardrobe.columns.id,
    }),
    categoryId: column.text({
      optional: false,
      references: () => Category.columns.id,
    }),
    name: column.text({ optional: true }),
    description: column.text({ optional: true }),
    public: column.boolean({ optional: false, default: false }),
    imageUrl: column.text({ optional: false }),
    link: column.text({ optional: true }),
  },
});

const Outfit = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    ct: column.text({ optional: true, references: () => Clothe.columns.id }),
    cct: column.text({ optional: true, references: () => Clothe.columns.id }),
    cc: column.text({ optional: true, references: () => Clothe.columns.id }),
    ccb: column.text({ optional: true, references: () => Clothe.columns.id }),
    cb: column.text({ optional: true, references: () => Clothe.columns.id }),
    public: column.boolean({ optional: false, default: false }),
  },
});

const Category = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    wardrobeId: column.text({
      optional: false,
      references: () => Wardrobe.columns.id,
    }),
    name: column.text({ optional: false, default: "New Category" }),
    description: column.text({ optional: true }),
  },
});

const Follow = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    userFrom: column.text({
      optional: false,
      references: () => User.columns.id,
    }),
    userTo: column.text({ optional: false, references: () => User.columns.id }),
    active: column.boolean({ optional: false, default: true }),
  },
});

const Like = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    userFrom: column.text({
      optional: false,
      references: () => User.columns.id,
    }),
    userTo: column.text({ optional: false, references: () => User.columns.id }),
    clotheTo: column.text({
      optional: false,
      references: () => Clothe.columns.id,
    }),
    active: column.boolean({ optional: false, default: true }),
  },
});

export default defineDb({
  tables: { Session, User, Wardrobe, Clothe, Outfit, Category, Follow, Like },
});
