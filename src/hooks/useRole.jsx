import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email, // ✅ FIXED
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/role/${user.email}`
      )
      return data.role
    }
  })

  return [role, isRoleLoading]
}

export default useRole
