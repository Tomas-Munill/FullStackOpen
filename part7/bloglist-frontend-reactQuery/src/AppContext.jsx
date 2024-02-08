import { createContext, useReducer, useContext } from 'react';
import { initialState, rootReducer } from './reducers/rootReducer';

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const stateAndDispatch = useContext(AppContext);
  return stateAndDispatch[0];
};

export const useAppDispatch = () => {
  const stateAndDispatch = useContext(AppContext);
  return stateAndDispatch[1];
};

export default AppContext;
