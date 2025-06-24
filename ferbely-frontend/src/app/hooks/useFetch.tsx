import { useQuery } from "@tanstack/react-query";

const useFetch = (query: string, api: any) => {
    const { data, isLoading, error } = useQuery({   
        queryKey: [query],
        queryFn: async () => await api.getAll(),
    });
    return { data, isLoading, error };
}
 
export default useFetch;