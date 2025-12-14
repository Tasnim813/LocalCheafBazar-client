import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useStatus = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: status, isLoading } = useQuery({
    enabled: !loading && !!user?.email, // user available হলে fetch হবে
    queryKey: ['status', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`users/status/${user?.email}`)
      // data expected: { status: 'active' / 'fraud' / ... }
      return data.status
    }
  })

  return [status || null, isLoading]
}

export default useStatus
