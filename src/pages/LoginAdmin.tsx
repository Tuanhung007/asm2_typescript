import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductListPage from './admin/ProductListPage'

const LoginAdmin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = window.sessionStorage.getItem('access-token')

    if (!token) {
      navigate('/login')
    } else {
      navigate('/admin/products')
    }
  }, [navigate])
  return (
    <div>
      <ProductListPage />
    </div>
  )
}

export default LoginAdmin
