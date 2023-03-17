import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/acronyms", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

export default db;
