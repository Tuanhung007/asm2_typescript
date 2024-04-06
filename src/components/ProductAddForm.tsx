import { useForm } from 'react-hook-form'
import { Button, Container, Form } from 'react-bootstrap'
import { ProductFormValue } from '@/types/Product'
import { createProduct } from '@/services/product'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import logo from './img/logo.png'
const ProductAddForm = () => {
  const useFormResult = useForm<ProductFormValue>()
  const register = useFormResult.register
  const handleSubmit = useFormResult.handleSubmit
  const formState = useFormResult.formState
  const errors = formState.errors
  const navigate = useNavigate()

  const onSubmit = (formValue: ProductFormValue) => {
    createProduct(formValue).then(() => {
      toast('Thêm thành công', { autoClose: 1000 })
      navigate('/admin/products')
    })
  }

  return (
    <Container>
      <div className='edit-container'>
        <img src={logo} alt='logo' />
        <div className='edit'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                as={'input'}
                {...register('title', {
                  required: 'Phai nhap input nay',
                  minLength: {
                    value: 5,
                    message: 'So luong ki tu phai lon hon 5'
                  },
                  maxLength: {
                    value: 20,
                    message: 'So luong ki tu nho lon hon 20'
                  }
                })}
                isInvalid={!!errors?.title}
              />
              <Form.Control.Feedback type='invalid' style={{ color: 'white' }}>
                {errors?.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as='input'
                {...register('brand', {
                  required: 'Phai nhap brand'
                })}
                isInvalid={Boolean(errors?.brand)}
              />
              <Form.Control.Feedback type='invalid' style={{ color: 'white' }}>
                {errors?.brand?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                as='input'
                {...register('price', {
                  required: 'Phai nhap price',
                  minLength: {
                    value: 0,
                    message: 'price phai lon hon 0'
                  }
                })}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type='invalid' style={{ color: 'white' }}>
                {errors?.price?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                {...register('description', {
                  required: 'Phai nhap description',
                  minLength: {
                    value: 20,
                    message: 'Toi thieu 20 ki tu'
                  }
                })}
                isInvalid={Boolean(errors?.description)}
              />
              <Form.Control.Feedback type='invalid' style={{ color: 'white' }}>
                {errors?.description?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>thumbnail</Form.Label>
              <Form.Control
                as='input'
                {...register('thumbnail', {
                  required: 'Phai nhap thumbnail'
                })}
                isInvalid={Boolean(errors?.thumbnail)}
              />
              <Form.Control.Feedback type='invalid' style={{ color: 'white' }}>
                {errors?.thumbnail?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className='w-100' type='submit' variant='primary' onClick={() => {}}>
              Thêm sản phẩm
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default ProductAddForm
