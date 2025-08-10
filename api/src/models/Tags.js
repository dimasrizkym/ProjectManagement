import mongose from "mongoose";

const tagSchema = new mongose.Schema(
  {
    tag_name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Tags = mongose.model("Tags", tagSchema);

export default Tags;
