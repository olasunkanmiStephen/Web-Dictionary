import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState<string | null>('');
  const [error, setError] = useState<string | null>(null);

  const fetchDefinition = async () => {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/',
      params: { entry: word },
      headers: {
        'X-RapidAPI-Key': '246fee82d5msh167d9373396c39bp141440jsna527eca5afe4',
        'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
      },
    };

    try {
      const response: AxiosResponse = await axios.request(options);
      setDefinition(response.data.definition);
      setError(null);
    } catch (error) {
      console.error('Error fetching definition:', error);
      setDefinition(null);
      setError('Error fetching definition');
    }
  };

  useEffect(() => {
    // You can add additional logic here if needed when the component mounts or word state changes
  }, [word]);

  return (
    <div>
      <h1>Web Dictionary</h1>
      <label>
        Enter a word:
        <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
      </label>
      <button onClick={fetchDefinition}>Search</button>
      {error && <p>Error: {error}</p>}
      {definition !== null && (
        <div>
          <h2>Definition:</h2>
          <p>{definition}</p>
        </div>
      )}
    </div>
  );
};

export default Dictionary;
