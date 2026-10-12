import {sql} from "drizzle-orm";
import {integer,sqliteTable,text} from "drizzle-orm/sqlite-core";
export const enquiries=sqliteTable("enquiries",{id:integer("id").primaryKey({autoIncrement:true}),name:text("name").notNull(),email:text("email").notNull(),business:text("business").notNull().default(""),service:text("service").notNull().default(""),message:text("message").notNull(),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)});
