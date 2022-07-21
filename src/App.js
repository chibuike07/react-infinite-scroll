import { QueryClientProvider, QueryClient } from "react-query";
import "./App.css";
import Home from "./View/Home";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div className="App">
        <Home />
      </div>
      ;
    </QueryClientProvider>
  );
};

export default App;
