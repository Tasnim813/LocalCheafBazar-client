import { Navigate } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useStatus from '../hooks/useStatus'

const FraudRoute = ({ children }) => {
  const [status, isLoading] = useStatus()

  if (isLoading) return <LoadingSpinner />

  // ❌ Fraud user → redirect
  if (status === 'fraud') {
    return <Navigate to='/' replace />
  }

  // ✅ Active user → allow
  return children
}

export default FraudRoute
