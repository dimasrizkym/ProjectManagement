export const formatJoiErrors = (error) => {
  if (!error?.details) return [];

  return error.details.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
};
