import { useState } from 'react';

const useInput = (initialState) => {
  const [state, setState] = useState(initialState);
  const set = (event) => setState(event.target.value);
  const reset = () => setState(initialState);
  return [state, set, reset];
};

export default useInput;
