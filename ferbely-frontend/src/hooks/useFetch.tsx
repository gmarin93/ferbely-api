'use client';

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useFetch = (query: string, enableSuspense = false, fetchFn: any = api.get) => {
    const queryConfig = {
        queryKey: [query],
        queryFn: async () => await fetchFn(),
        ...(enableSuspense && { 
            suspense: true,
            throwOnError: true 
        })
    };
    
    const { data, isLoading, error } = useQuery(queryConfig);
    return { data, isLoading, error };
}
 
export default useFetch;