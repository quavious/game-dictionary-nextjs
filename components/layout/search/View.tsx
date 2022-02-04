import { ChangeEvent, FormEvent } from 'react';

const SearchView = ({
  term,
  handleChange,
  handleSubmit,
}: {
  term: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className="flex justify-end mx-4" onSubmit={handleSubmit}>
      <input
        className="py-1 px-2 mr-2 w-full fold:w-44 xs:w-64 sm:w-72 md:w-96 rounded"
        onChange={handleChange}
        value={term}
      />
      <button className="bg-purple-600 rounded py-1 px-2 text-white">
        Search
      </button>
    </form>
  );
};

export default SearchView;
