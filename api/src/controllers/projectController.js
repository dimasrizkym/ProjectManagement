import Project from "../models/Projects.js";
import { formatJoiErrors } from "../utils/formatJoiErrors.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validations/projectValidation.js";

export const createProject = async (req, res) => {
  // validate project data
  const { error } = createProjectSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({ message: "Invalid project data", errors });
  }

  try {
    const { title, description, dueDate, tags, priority } = req.body;
    const project = await Project.create({
      title,
      description,
      dueDate,
      tags,
      priority,
      owner: req.user._id,
      collabolators: [req.user._id],
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.log("Error creating project:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { error } = updateProjectSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({ message: "Invalid project data", errors });
  }

  try {
    const { projectId, title, description, dueDate, tags, priority } = req.body;
    const project = await Project.findByIdAndUpdate(projectId, {
      title,
      description,
      dueDate,
      tags,
      priority,
    });

    res.status(200).json({ message: `Project updated successfully`, project });
  } catch (error) {
    console.log("Error updating project:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Projects retrieved successfully", projects });
  } catch (error) {
    console.log("Error retrieving projects:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
