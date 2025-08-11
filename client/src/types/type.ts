export interface Project {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: string;
  tags: string[];
  collabolators: {
    _id: string;
    name: string;
    email: string;
  }[];
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  totalJobsCount: number;
  completedJobsCount: number;
  precentageCompleted: number;
}
