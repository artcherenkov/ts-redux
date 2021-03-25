import React, { useState } from "react";
import { shallowEqual } from "react-redux";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories,
    shallowEqual
  );

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setTerm(evt.target.value);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={term} onChange={onChange} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && (
        <ul>
          {data.map((name) => (
            <li key={`name-${name}`}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepositoriesList;
