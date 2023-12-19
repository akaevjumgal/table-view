import { Provider } from "react-redux";
import { store } from "./app/providers/store";
import { DraftTable } from "./widgets/DraftTable";

export default function App() {
  return (
    <Provider store={store}>
      <main>
        <DraftTable />
      </main>
    </Provider>
  );
}
