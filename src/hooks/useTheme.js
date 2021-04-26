import { createMuiTheme } from '@material-ui/core/styles';

const useTheme = (darkMode) => {
  const theme = {
    palette: {
      type: darkMode.value ? 'dark' : 'light',
    },
  };
  return createMuiTheme(theme);
};

export default useTheme;
