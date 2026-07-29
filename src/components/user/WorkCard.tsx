import { Link } from "react-router-dom";
interface Work {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
}

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  return (
    <Link to={`/work/${work.id}`} className="group">
      <div className="overflow-hidden rounded-3xl bg-[#111]">
        <img
          src={work.thumbnail}
          alt={work.title}
          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="p-6">
          <h3 className="text-xl font-semibold">{work.title}</h3>

          <p className="mt-2 text-sm text-gray-400">{work.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
