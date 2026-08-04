// //backend/src/routes/todoRoutes.ts
// import { Router } from 'express';
// import type { Request, Response } from 'express';
// import { Todo } from '../models/Todo.js';  
// import mongoose from 'mongoose';

// const router = Router();

// // GET ALL
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const todos = await Todo.find().sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       count: todos.length,
//       data: todos,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // POST (Create)
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const { title } = req.body;
//     if (!title) {
//       return res.status(400).json({ success: false, message: 'Title is required' });
//     }
//     const newTodo = await Todo.create({ title: title.trim() });
//     res.status(201).json({ success: true, data: newTodo });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // PUT (Update)
// router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, completed } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid ID' });
//     }

//     const updateData: any = {};
//     if (title !== undefined) updateData.title = title.trim();
//     if (completed !== undefined) updateData.completed = completed;

//     const updatedTodo = await Todo.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!updatedTodo) {
//       return res.status(404).json({ success: false, message: 'Todo not found' });
//     }

//     res.json({ success: true, data: updatedTodo });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // DELETE
// router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: 'Invalid ID' });
//     }

//     const deletedTodo = await Todo.findByIdAndDelete(id);

//     if (!deletedTodo) {
//       return res.status(404).json({ success: false, message: 'Todo not found' });
//     }

//     res.json({ success: true, message: 'Todo deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;

//backend/src/routes/todoRoutes.ts
import { Router } from "express";
import type { Request, Response } from "express";
import { Todo } from "../models/Todo.js";
import mongoose from "mongoose";

const router = Router();

// GET ALL
router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(500).json({
      success: false,
      message,
    });
  }
});

// POST (Create)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const newTodo = await Todo.create({
      title: title.trim(),
    });

    res.status(201).json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(500).json({
      success: false,
      message,
    });
  }
});

// PUT (Update)
router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const updateData: any = {};

    if (title !== undefined) updateData.title = title.trim();
    if (completed !== undefined) updateData.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(500).json({
      success: false,
      message,
    });
  }
});

// DELETE
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(500).json({
      success: false,
      message,
    });
  }
});

export default router;