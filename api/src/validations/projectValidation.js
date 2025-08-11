import Joi from "joi";

export const createProjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  dueDate: Joi.string().greater("now").required(),
  tags: Joi.array().items(Joi.string()).required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
});
