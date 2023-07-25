import RootNavigation from "./navigation/RootNavigation.jsx";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./store/store.js";
import {Provider} from "react-redux";

function App() {
  return (
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <RootNavigation/>
        </Provider>
    </PersistGate>
  )
}

export default App
