import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '@/services/product'
import { Product } from '@/types/Product'
import Layout from '@/layouts/Layout'
import { FaSpinner } from 'react-icons/fa'
const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true)
          const productData = await getProduct(id)
          setProduct(productData)
        } catch (error) {
          console.error('Error fetching product:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50vh' }}>
        Loading...
        <FaSpinner className='spinner' />
      </div>
    )
  }

  if (!product) {
    return <div>Product not found!</div>
  }

  return (
    // <Layout>
    //   <div className='container-detail'>

    //     <img src={product.thumbnail} alt={product.title} />
    //     <h1>{product.title}</h1>
    //     <p>Description: {product.description}</p>
    //     <p>Brand: {product.brand}</p>
    //     <p>Price: {product.price}</p>
    //     {/* Thêm các phần khác của trang chi tiết sản phẩm */}
    //   </div>
    // </Layout>
    <Layout>
      <div className='container-detail'>
        <div className='product_detail_khach'>
          <div className='product-image'>
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className='product-info'>
            <h1>Tiêu đề: {product.title}</h1>
            <p className='description'>Mô tả: {product.description}</p>
            <p className='brand'>Thương hiệu: {product.brand}</p>
            <p className='price'>Giá: {product.price}đ</p>
            <button className='buy-now-btn'>Mua Ngay</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetail
