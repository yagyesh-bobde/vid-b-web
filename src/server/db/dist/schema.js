"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.verificationTokens = exports.sessionsRelations = exports.sessions = exports.accountsRelations = exports.accounts = exports.usersRelations = exports.users = exports.posts = exports.transcriptions = exports.createTable = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
exports.createTable = pg_core_1.pgTableCreator(function (name) { return "vid-b-web_" + name; });
exports.transcriptions = exports.createTable("transcriptions", {
    id: pg_core_1.serial("id").primaryKey(),
    // userId: varchar("userId", { length: 255 }).notNull().references(() => users.id),
    audioUrl: pg_core_1.varchar("audioUrl", { length: 255 }).notNull().unique(),
    videoId: pg_core_1.varchar("videoId", { length: 255 }).notNull().unique(),
    conversationId: pg_core_1.varchar("conversationId", { length: 255 }),
    jobId: pg_core_1.varchar("jobId", { length: 255 }),
    transcription: pg_core_1.text("transcription"),
    createdAt: pg_core_1.timestamp("createdAt")["default"](drizzle_orm_1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))).notNull(),
    updatedAt: pg_core_1.timestamp("updatedAt")
});
exports.posts = exports.createTable("post", {
    id: pg_core_1.serial("id").primaryKey(),
    name: pg_core_1.varchar("name", { length: 256 }),
    createdById: pg_core_1.varchar("createdById", { length: 255 })
        .notNull()
        .references(function () { return exports.users.id; }),
    createdAt: pg_core_1.timestamp("created_at")["default"](drizzle_orm_1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"]))))
        .notNull(),
    updatedAt: pg_core_1.timestamp("updatedAt")
}, function (example) { return ({
    createdByIdIdx: pg_core_1.index("createdById_idx").on(example.createdById),
    nameIndex: pg_core_1.index("name_idx").on(example.name)
}); });
exports.users = exports.createTable("user", {
    id: pg_core_1.varchar("id", { length: 255 }).notNull().primaryKey(),
    name: pg_core_1.varchar("name", { length: 255 }),
    email: pg_core_1.varchar("email", { length: 255 }).notNull(),
    emailVerified: pg_core_1.timestamp("emailVerified", {
        mode: "date"
    })["default"](drizzle_orm_1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))),
    image: pg_core_1.varchar("image", { length: 255 })
});
exports.usersRelations = drizzle_orm_1.relations(exports.users, function (_a) {
    var many = _a.many;
    return ({
        accounts: many(exports.accounts)
    });
});
exports.accounts = exports.createTable("account", {
    userId: pg_core_1.varchar("userId", { length: 255 })
        .notNull()
        .references(function () { return exports.users.id; }),
    type: pg_core_1.varchar("type", { length: 255 })
        .$type()
        .notNull(),
    provider: pg_core_1.varchar("provider", { length: 255 }).notNull(),
    providerAccountId: pg_core_1.varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: pg_core_1.text("refresh_token"),
    access_token: pg_core_1.text("access_token"),
    expires_at: pg_core_1.integer("expires_at"),
    token_type: pg_core_1.varchar("token_type", { length: 255 }),
    scope: pg_core_1.varchar("scope", { length: 255 }),
    id_token: pg_core_1.text("id_token"),
    session_state: pg_core_1.varchar("session_state", { length: 255 })
}, function (account) { return ({
    compoundKey: pg_core_1.primaryKey({
        columns: [account.provider, account.providerAccountId]
    }),
    userIdIdx: pg_core_1.index("account_userId_idx").on(account.userId)
}); });
exports.accountsRelations = drizzle_orm_1.relations(exports.accounts, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, { fields: [exports.accounts.userId], references: [exports.users.id] })
    });
});
exports.sessions = exports.createTable("session", {
    sessionToken: pg_core_1.varchar("sessionToken", { length: 255 })
        .notNull()
        .primaryKey(),
    userId: pg_core_1.varchar("userId", { length: 255 })
        .notNull()
        .references(function () { return exports.users.id; }),
    expires: pg_core_1.timestamp("expires", { mode: "date" }).notNull()
}, function (session) { return ({
    userIdIdx: pg_core_1.index("session_userId_idx").on(session.userId)
}); });
exports.sessionsRelations = drizzle_orm_1.relations(exports.sessions, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, { fields: [exports.sessions.userId], references: [exports.users.id] })
    });
});
exports.verificationTokens = exports.createTable("verificationToken", {
    identifier: pg_core_1.varchar("identifier", { length: 255 }).notNull(),
    token: pg_core_1.varchar("token", { length: 255 }).notNull(),
    expires: pg_core_1.timestamp("expires", { mode: "date" }).notNull()
}, function (vt) { return ({
    compoundKey: pg_core_1.primaryKey({ columns: [vt.identifier, vt.token] })
}); });
var templateObject_1, templateObject_2, templateObject_3;
