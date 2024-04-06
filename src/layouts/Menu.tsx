import { FC } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BsCart } from 'react-icons/bs'
import { RiUserLine } from 'react-icons/ri' // Thay đổi từ RxPerson thành RiUserLine
import logo from './img/l-removebg-preview.png'
type Props = object

const Menu: FC<Props> = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        {/* Thêm logo */}
        <Navbar.Brand href='/'>
          <img src={logo} alt='Logo' width={100} />
          {/* Thay đổi đường dẫn logo của bạn */}
        </Navbar.Brand>
        {/* Kết thúc thêm logo */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='nav_bar_menu me-auto'>
          <Nav className='me-auto nav_bar_menu'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/products'>Product</Nav.Link>
            <Nav.Link href='#link'>Category</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              id='nav-dropdown-dark-example'
              title={
                <div style={{ minWidth: 30 }}>
                  <RiUserLine /> {/* Sử dụng biểu tượng user của React Icons */}
                </div>
              }
              className={'profile-dropdown'}
            >
              <NavDropdown.Item href='/admin/products'>Admin</NavDropdown.Item>
              <NavDropdown.Item href='/login'>login</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              <BsCart />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu
