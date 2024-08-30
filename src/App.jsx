import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import AppRouter from "./routers/app.router";
import { Provider } from "react-redux";
import store from "./redux/store";
// ------------------------------------

function App() {

  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </Suspense>
    </Router>
  )
}

export default App;
