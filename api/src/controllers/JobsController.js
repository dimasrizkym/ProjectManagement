import Jobs from "../models/Jobs.js";

export const getJobs = async (req, res) => {
  const { projectId } = req.params;

  try {
    const jobs = await Jobs.find({ project: projectId })
      .sort({ createdAt: -1 })
      .populate({
        path: "project",
        select: "name email",
      });

    res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
    });
  } catch (error) {}
};
