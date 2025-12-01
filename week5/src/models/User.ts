import mongoose, { Document, Schema } from "mongoose";

interface ITodo {
  todos: string
}

interface IUser extends Document {
  name: string
  todos: ITodo[]
}

let todoSchema: Schema<ITodo> = new Schema({
  todos: {type: String, required: true}
})

let userSchema: Schema<IUser> = new Schema({
  name: {type: String, required: true},
  todos: { type: [todoSchema], default: [] }
})

export default mongoose.model<IUser>("User", userSchema);