import "@/shared/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAos } from "../shared/hooks/index";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClerkProvider } from "@clerk/nextjs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1250,
      staleTime: 1000 * 60 * 10,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useAos();

  return (
    <ClerkProvider {...pageProps}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>

  );
}
