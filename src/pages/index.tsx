import Layout from '@/layouts/Layout'
import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/product'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

type Props = {}

const Home: FC<Props> = () => {
  // const [loading, setLoading] = useState<boolean>(true)

  const result = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  const products = result.data || []
  const loading = result.isLoading
  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50vh' }}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='container_index'>
      <Layout>
        <ul className='product-list'>
          {products.map((product) => (
            <li key={product.id} className='product-item'>
              <Link to={'/products/' + product.id}>
                {/* từng product --product-card*/}
                <div className='product-card'>
                  <img className='product-thumbnail' src={product.thumbnail} alt='ảnh lỗi' /> <br />
                  <div className='product-info'>
                    <a className='product-title'>{product.title}</a> <br />
                    <span className='product-price'>
                      <span className='price'>{product.price} </span>đ
                    </span>
                    <br />
                    <span className='product-brand'> {product.brand}</span>
                  </div>
                </div>
                {/* --end */}
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  )
}

export default Home
