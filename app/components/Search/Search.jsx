const Search = ({ style }) => {
  return (
    <form>
      <input
        type="text"
        className={style}
        placeholder="Search for projects"
      />
    </form>
  );
};

export default Search;
