import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

function Provider({ children }: Props) {
  useReactQueryDevTools(queryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default Provider;
