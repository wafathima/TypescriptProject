//backend/src/models/Todo.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret.id.toString();
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

TodoSchema.index({ title: 1 });
TodoSchema.index({ completed: 1 });
TodoSchema.index({ createdAt: -1 });

export const Todo = mongoose.model<ITodo>('Todo', TodoSchema);