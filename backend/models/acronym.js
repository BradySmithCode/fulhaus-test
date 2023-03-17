import mongoose from "mongoose";

const acronymSchema = new mongoose.Schema(
  {
    acronym: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
  },
  { collection: "acronym" }
);

const Acronym = mongoose.model("acronym", acronymSchema);

export default Acronym;
