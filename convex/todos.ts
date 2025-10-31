import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all todos
export const getTodos = query({
    handler: async (ctx) => {
        return await ctx.db.query("todos").order("desc").collect();
    },
});

    // Add a new todo
    export const addTodo = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todos", {
        text: args.text,
        checked: false,
        createdAt: Date.now(),
        });
        return todoId;
    },
});

    // Toggle todo checked status
    export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (todo) {
        await ctx.db.patch(args.id, { checked: !todo.checked });
        }
    },
});

    // Delete a todo
    export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

    // Clear all completed todos
    export const clearCompleted = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        const completedTodos = todos.filter(todo => todo.checked);
        
        for (const todo of completedTodos) {
        await ctx.db.delete(todo._id);
        }
    },
});