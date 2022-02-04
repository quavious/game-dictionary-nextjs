import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import SearchView from './View';

const SearchPresenter = () => {
  const router = useRouter();
  const [term, setTerm] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTerm(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${term}/1`);
  };

  return (
    <SearchView
      term={term}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default SearchPresenter;
