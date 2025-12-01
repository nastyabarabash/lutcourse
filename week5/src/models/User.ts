import mongoose, { Document, Schema } from "mongoose";

interface ITodo {
  todo: string
}

interface IUser extends Document {
  name: string
  todos: ITodo[]
}

let todoSchema: Schema<ITodo> = new Schema({
  todo: {type: String, required: true}
})

let userSchema: Schema<IUser> = new Schema({
  name: {type: String, required: true},
  todos: { type: [todoSchema], default: [] }
})

const User = mongoose.model<IUser>("User", userSchema);

export { User };
// export type { IUser, ITodo };