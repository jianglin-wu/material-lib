import { Link } from 'react-router-dom';

const Header = ({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) => {
  return (
    <div className="w-full backdrop-blur bg-white/20 after:block after:clear-both py-2">
      <div className="flex float-right space-x-2 mr-4">
        {items.map((item) => (
          <Link
            className="inline-block bg-slate-500/20 py-1 px-2 rounded text-cyan-200 hover:text-cyan-300 hover:underline"
            to={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
