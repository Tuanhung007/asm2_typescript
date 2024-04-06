import { useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { signIn } from '@/services/auth'
import { SignInForm } from '@/types/Auth'
import { Link, useNavigate } from 'react-router-dom' // Thêm '.dom' vào cuối import

const SignInPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignInForm>()
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const onSubmit = async (formValue: SignInForm) => {
    setSignUpLoading(true)
    try {
      await signIn(formValue)
      toast('Đăng ký thành công!')
      navigate('/')
    } catch (error) {
      console.error('Lỗi đăng ký:', error)
      toast.error('Đăng ký thất bại!')
    } finally {
      setSignUpLoading(false)
    }
  }

  return (
    <Container>
      <div className='login-container'>
        <div className='login'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='fs-3 text-center'>Đăng ký</h1>
            <Form.Group controlId='signInEmail'>
              <Form.Control
                className='mt-4'
                placeholder='Email...'
                type='email'
                {...register('email', { required: 'Vui lòng nhập email' })}
              />
              {errors.email && <div className='text-danger'>{errors.email.message}</div>}
            </Form.Group>
            <Form.Group controlId='signInPassword'>
              <Form.Control
                className='mt-2'
                placeholder='Password'
                type='password'
                {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
              />
              {errors.password && <div className='text-danger'>{errors.password.message}</div>}
            </Form.Group>
            <div className='mt-3'>
              <Button className='  bnt-dangnhap' type='submit' disabled={signUpLoading}>
                {signUpLoading ? <Spinner /> : 'Đăng Ký'}
              </Button>
              <Link to='/login' className='ms-3'>
                <Button className='align-center w-40 bnt-dangky'>Đăng Nhập</Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default SignInPage
