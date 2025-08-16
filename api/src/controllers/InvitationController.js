import Invitation from "../models/Invitation.js";
import Project from "../models/Projects.js";
import User from "../models/User.js";
import { sendInvitationValidationSchema } from "../validations/invitationValidation.js";

export const sendInvitation = async (req, res) => {
  const { email, projectId } = req.body;

  const { error } = sendInvitationValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({ message: "Invalid invitation data", errors });
  }

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // invitation has already been sent and accepted or rejected
    const existingInvitation = await Invitation.findOne({
      sender: req.user._id,
      receiver: user._id,
      project: project._id,
    });

    if (existingInvitation) {
      return res
        .status(400)
        .json({ message: "Invitation has already been sent" });
    }

    // check if user is already a collabolator of the project
    const isCollaborator = project.collabolators.includes(user._id);
    if (isCollaborator) {
      return res
        .status(400)
        .json({ message: "User is already a collabolator of the project" });
    }

    // create invitation
    const invitation = await Invitation.create({
      sender: req.user._id,
      receiver: user._id,
      project: project._id,
    });

    res
      .status(201)
      .json({ message: "Invitation sent successfully", invitation });
  } catch (error) {
    console.log("Error sending invitation:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getSentInvitations = async (req, res) => {
  const { projectId } = req.params;

  try {
    const invitation = await Invitation.find({ project: projectId }).populate({
      path: "receiver",
      select: "name email",
    });

    res
      .status(200)
      .json({ message: "Invitations retrieved successfully", invitation });
  } catch (error) {
    console.log("Error retrieving invitations:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
