import { SearchIcon } from '../../assets/icons';

const Search = ({ ...rest }) => {
  return (
    <div className="grid grid-cols-button rounded-lg border-2 border-accent px-1">
      <input className="bg-base-1 p-2 focus:outline-none" placeholder="Search" {...rest} />
      <button className="focus:shadow-outline border-none bg-base-1 focus:outline-none">
        <SearchIcon />
      </button>
    </div>
  );
};

export { Search };
