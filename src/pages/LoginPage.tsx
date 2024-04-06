import { useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { login } from '@/services/auth' // Sử dụng hàm login từ đúng đường dẫn
import { LoginForm } from '@/types/Auth'
import { Link, useNavigate } from 'react-router-dom' // Thêm '.dom' vào cuối import

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginForm>()
  const [signInLoading, setSignInLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleSignIn = async (formValue: LoginForm) => {
    setSignInLoading(true)
    try {
      const res = await login(formValue) // Sử dụng hàm login
      const accessToken = res.accessToken
      window.sessionStorage.setItem('access-token', accessToken)
      toast('Đăng nhập thành công!')
      navigate('/')
    } catch (error) {
      console.error('Lỗi đăng nhập:', error)
      toast.error('Đăng nhập thất bại!')
    } finally {
      setSignInLoading(false)
    }
  }

  return (
    <Container>
      <div className='login-container'>
        <div className='login'>
          <Form onSubmit={handleSubmit(handleSignIn)}>
            <h1 className='fs-3 text-center'>Đăng nhập</h1>
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
              <Button className=' bnt-dangnhap' type='submit' disabled={signInLoading}>
                {signInLoading ? <Spinner /> : 'Đăng nhập'}
              </Button>
              <Link to='/sign-in' className='ms-3'>
                <Button className='align-center w-40 bnt-dangky '>Đăng ký</Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default LoginPage
