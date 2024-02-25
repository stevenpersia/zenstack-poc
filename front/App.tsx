import QueryClientProvider from "./QueryClientProvider";
import { Test } from "./Test";

export default function App() {
  return (
    <QueryClientProvider>
      <Test />
    </QueryClientProvider>
  );
}
