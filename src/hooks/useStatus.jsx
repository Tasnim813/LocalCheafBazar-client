import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useStatus = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['status', user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/users/status/${user?.email}`
        )
        return res.data.status
      } catch (error) {
        console.error('Status fetch error', error)
        return 'active' // fallback safety
      }
    }
  })

  return [data ?? 'active', isLoading]
}

export default useStatus
