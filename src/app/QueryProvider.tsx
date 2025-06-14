import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60,
        }
    }
});

export default function QueryProvider({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}