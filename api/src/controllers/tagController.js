import Tags from "../models/Tags.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tags.find();
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error retrieving tags:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createTags = async (req, res) => {
  try {
    const tags = ["development", "design", "backend", "frontend"];

    const tag = tags.map((tag) => ({ tag_name: tag }));

    await Tags.insertMany(tag, { ordered: true });
    res.status(200).json({ message: "Tags created successfully", tags });
  } catch (error) {
    console.log("Error creating tags:", error);
    res.status(500).json({ message: error.message });
  }
};
