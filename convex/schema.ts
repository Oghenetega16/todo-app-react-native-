import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    todos: defineTable({
        text: v.string(),
        checked: v.boolean(),
        createdAt: v.number(),
        order: v.optional(v.number()),
    }).index("by_created_at", ["createdAt"]),
});