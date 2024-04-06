import axiosInstance from '@/config/axiosInstance.ts'
import { Product, ProductFormValue } from '@/types/Product'
import sleep from '@/ultis/sleep.ts'

const getProducts = async (): Promise<Product[]> => {
  await sleep()
  const response = await axiosInstance.get('/products')

  return response.data
}

const getProduct = async (id: string): Promise<Product> => {
  await sleep()

  const response = await axiosInstance.get('/products/' + id)
  return response.data
}
const updateProduct = async (id: string, newValue: ProductFormValue): Promise<Product> => {
  await sleep()
  return axiosInstance.put(`/products/${id}`, newValue)
  
}

const createProduct = async (formValue: ProductFormValue) => {
  await sleep()

  return axiosInstance.post('/products', formValue)
}
const deleteProduct = async (id: string): Promise<void> => {
  await sleep();
  await axiosInstance.delete(`/products/${id}`);
};


export { getProducts, getProduct, updateProduct, createProduct, deleteProduct }
