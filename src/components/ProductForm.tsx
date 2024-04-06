import { updateProduct } from '@/services/product'
import { Product, ProductFormValue } from '@/types/Product'
import { FC, useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import logo from './img/Bao-hanh.png'

type Props = {
  product: Product
}

const ProductForm: FC<Props> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormValue>({
    defaultValues: {
      title: product.title,
      description: product.description,
      brand: product.brand,
      price: String(product.price),
      thumbnail: String(product.thumbnail)
    }
  })
  const [signInLoading, setSignInLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const onSubmit = (formValue: ProductFormValue) => {
    setSignInLoading(true)

    updateProduct(product.id, formValue).then(() => {
      toast('Sửa thành công', { autoClose: 1000 })
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
                    message: 'Gia phai lon hon 0'
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

            {/* <Button type='submit' variant='primary' onClick={() => {}}>
          Sửa
        </Button> */}
            <Button className='w-100' type='submit' disabled={signInLoading} variant='primary' onClick={() => {}}>
              {signInLoading ? <Spinner /> : 'Sửa'}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default ProductForm
