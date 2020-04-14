import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    async function getProjects(){
      const response = await api.get('repositories');

      setRepositories(response.data);
    }
    getProjects();
  },[])
  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'Projeto React Native',
      url: 'https://github.com/marcoavfcc01121979/frontend',
      techs: ["ReactJs", "React Native"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
} 

export default App;
