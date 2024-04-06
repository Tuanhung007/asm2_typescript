import ProductForm from '@/components/ProductForm'
import { getProduct } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const ProductDetailPage: FC = () => {
  const { id } = useParams()

  const result = useQuery({
    queryKey: ['product'],
    queryFn: () => (id ? getProduct(id) : undefined)
  })

  const product = result.data
  const loading = result.isLoading
  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50vh' }}>
        <Spinner />
      </div>
    )
  }

  return <div>{product && <ProductForm product={product} />}</div>
}

export default ProductDetailPage
