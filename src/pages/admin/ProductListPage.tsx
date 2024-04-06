import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getProducts, deleteProduct } from '@/services/product'
import { Table, Button, Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ProductListPage() {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null)

  const result = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  const products = result.data || []

  const loading = result.isLoading
  const queryClient = useQueryClient()

  const handleClickBtnDelete = (productId: string) => {
    setDeletingProductId(productId)
    setOpenModalConfirm(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId)

      toast('Xóa thanh cong', { autoClose: 1000 })
      // Render lại dữ liệu sau khi xóa
      queryClient.invalidateQueries()
    } catch (error) {
      console.error('xoa that bai:', error)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50vh' }}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='product_list_container'>
      <h1>Product list</h1>
      <div className='list_contai'>
        <Table striped bordered hover size='sm' variant='info'>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Price</th>
              <th>thumbnail</th>
              <th className='product_table_action'>
                Actions
                <Link to={'/admin/products/create'}>
                  <Button>Thêm</Button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>
                    <img src={product.thumbnail} alt='url hết hạn' style={{ width: '150px', borderRadius: '15px' }} />
                  </td>
                  <td>
                    <div className='product_table_action'>
                      <Link to={`/admin/products/${product.id}`}>
                        <Button variant='secondary'>Edit</Button>
                      </Link>
                      <Button variant='danger' onClick={() => handleClickBtnDelete(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Modal show={openModalConfirm} onHide={() => setOpenModalConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setOpenModalConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant='primary'
              onClick={async () => {
                await handleDeleteProduct(deletingProductId || '')
                setOpenModalConfirm(false)
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
