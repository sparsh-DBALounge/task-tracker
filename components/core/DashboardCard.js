import Link from 'next/link';

const DashboardCard = ({ title, count, description, link, color }) => {
  return (
    <Link
      href={link}
      className={`p-4 rounded-lg shadow-lg text-white ${color} hover:bg-opacity-80 transition`}
    >
      <h2 className='text-xl font-semibold'>{title}</h2>
      <p className='text-2xl font-bold mt-2'>{count}</p>
      <p className='mt-2'>{description}</p>
    </Link>
  );
};

export default DashboardCard;
