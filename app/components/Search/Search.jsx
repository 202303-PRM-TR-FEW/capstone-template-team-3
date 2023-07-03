import "./Search.css";

const Search = () => {
  return (
    <form>
      <input
        type="text"
        className="search bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for projects"
      />
    </form>
  );
};

export default Search;
