import { useState } from 'react';

const useSwitch = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const open = () => setState(true);
  const close = () => setState(false);
  return [state, open, close];
};

export default useSwitch;
