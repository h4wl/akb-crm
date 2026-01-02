import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createSlug } from './uid';

export const usersTable = pgTable('users_table', {
    id: varchar('id', { length: 5 }).primaryKey()
        .$defaultFn(() => createSlug()),
    clerkId: text('clerk_id').notNull().unique(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),

});

export const routesTable = pgTable('routes_table', {
    id: varchar('id', { length: 5 }).primaryKey()
        .$defaultFn(() => createSlug()),
    routeName: text('route_name').notNull(),
    description: text('description').notNull(),
    userId: varchar('user_id', { length: 5 })
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const accountsTable = pgTable('accounts_table', {
    id: varchar('id', { length: 5 }).primaryKey()
        .$defaultFn(() => createSlug()),
    routeId: varchar('route_id', { length: 5 })
        .notNull()
        .references(() => routesTable.id, { onDelete: 'cascade' }),
    accountName: text('account_name').notNull(),
    accountNumber: text('account_number').notNull().unique(),
    address: text('address'),
    city: text('city'),
    state: text('state'),
    zipCode: text('zip_code'),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertRoute = typeof routesTable.$inferInsert;
export type SelectRoute = typeof routesTable.$inferSelect;

export type InsertAccount = typeof accountsTable.$inferInsert;
export type SelectAccount = typeof accountsTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
