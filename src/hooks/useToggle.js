import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((currentState) => !currentState);
  return [state, toggle, setState];
};

export default useToggle;
