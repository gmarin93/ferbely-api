import { useQuery } from "@tanstack/react-query";
import { API_CONFIG } from "@/config/api";

const useFetch = (query: string, api: any) => {
    const { data, isLoading, error } = useQuery({   
        queryKey: [query],
        //queryFn: () => fetch(`${API_CONFIG.BASE_URL}/${query}`).then((res) => res.json()),
        queryFn: async () => await api.getAll(),
    });
    console.log(`${API_CONFIG.BASE_URL}/${query}`);
    return { data, isLoading, error };
}
 
export default useFetch;