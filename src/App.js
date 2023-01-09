import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, history, persistor } from "./reduxStore/store";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes history={history} />
      </PersistGate>
    </Provider>
  );
};
export default App;
