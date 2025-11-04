import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all todos
export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        // Sort by order field if it exists, otherwise use createdAt
        return todos.sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            return b.createdAt - a.createdAt; 
        });
    },
});

// Add a new todo
export const addTodo = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        // Get existing todos to determine the next order value
        const existingTodos = await ctx.db.query("todos").collect();
        const maxOrder = existingTodos.length > 0 
            ? Math.max(...existingTodos.map(t => t.order ?? t.createdAt))
            : 0;
        
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            checked: false,
            createdAt: Date.now(),
            order: maxOrder + 1,
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

// Reorder todos - FIXED VERSION
export const reorderTodos = mutation({
    args: { 
        todos: v.array(v.object({
            id: v.id("todos"),
            order: v.number()
        }))
    },
    handler: async (ctx, args) => {
        // First, verify all todos exist before updating any
        const todoChecks = await Promise.all(
            args.todos.map(todo => ctx.db.get(todo.id))
        );
        
        // Filter out any todos that no longer exist
        const validTodos = args.todos.filter((todo, index) => {
            const exists = todoChecks[index] !== null;
            if (!exists) {
                console.warn(`Todo ${todo.id} no longer exists, skipping update`);
            }
            return exists;
        });
        
        // Update only the valid todos
        for (const todo of validTodos) {
            try {
                await ctx.db.patch(todo.id, { order: todo.order });
            } catch (error) {
                // Catch any remaining edge cases
                console.error(`Failed to update todo ${todo.id}:`, error);
            }
        }
        
        return { updated: validTodos.length, skipped: args.todos.length - validTodos.length };
    },
});

// Migration: Add order field to existing todos (run this once)
export const migrateAddOrderField = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        let updated = 0;
        
        for (const todo of todos) {
            if (todo.order === undefined) {
                await ctx.db.patch(todo._id, { 
                    order: todo.createdAt
                });
                updated++;
            }
        }
        
        return { message: `Updated ${updated} todos with order field` };
    },
});