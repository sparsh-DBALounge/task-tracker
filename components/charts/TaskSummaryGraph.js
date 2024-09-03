import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const SummaryGraph = ({ taskSummary, employeeSummary, projectSummary }) => {
  const data = [
    {
      name: 'Tasks',
      Total: taskSummary.totalTasks,
    },
    {
      name: 'Employees',
      Total: employeeSummary.totalEmployees,
    },
    {
      name: 'Projects',
      Total: projectSummary.totalProject,
    },
  ];

  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Total' fill='#8884d8' barSize={50}>
          <LabelList dataKey='Total' position='top' />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SummaryGraph;
