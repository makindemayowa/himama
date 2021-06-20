import * as React from 'react';

const AppStateContext = React.createContext(initialState);
const AppDispatchContext = React.createContext(undefined);

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  centerData: {},
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    case 'SET_CENTER_DATA':
      return {
        ...prevState,
        isLoading: false,
        centerData: action.data?.center,
      };
  }
};

export function useAppState() {
  const state = React.useContext(AppStateContext);

  if (state === undefined) {
    throw new Error('You can only use useAppState inside a context provider');
  }

  return state;
}

export function useAppDispatch() {
  const dispatch = React.useContext(AppDispatchContext);

  if (dispatch === undefined) {
    throw new Error(
      'You can only use useAppDispatch inside a context provider',
    );
  }

  return dispatch;
}

export function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
