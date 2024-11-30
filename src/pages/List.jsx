import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-hot-toast'
import { Pen, Trash2, X } from 'lucide-react'
import { currency, formatIDR } from '../utils/utils'
import Add from './Add'

const List = ({token}) => {
  const [productList, setProductList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProductList(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

   useEffect(() => {
    fetchList()
  }, [])

  const handleEdit = (product) => {
    setProductToEdit(product)
    setIsModalOpen(true)
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, 
      {
        headers: {token}
      })

      if (response.data.success){
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const handleUpdateSuccess = () => {
    setIsModalOpen(false)
    fetchList()
    setProductToEdit(null)
  }

  return (
    <>
      <div className="py-4 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">All Product List</h1>
        {productList.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 shadow-lg">
              <thead className="bg-primary">
                <tr className='text-white text-left text-xs font-medium  uppercase tracking-wider'>
                  <th scope="col" className="px-6 py-3">Image</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3 hidden sm:table-cell">Category</th>
                  <th scope="col" className="px-6 py-3 hidden md:table-cell">Subcategory</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productList.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.images[0]} alt={product.name} className="h-10 md:h-20 w-auto rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-500">{product.subCategory}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{currency}{formatIDR(product.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-hover-primary mr-3">
                        <Pen onClick={() => handleEdit(product)} size={18} />
                      </button>
                      <button onClick={() => removeProduct(product.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xl text-gray-600">There's no product</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setIsModalOpen(false)
                setProductToEdit(null)
              }} 
              className="absolute top-4 right-4 z-10"
            >
              <X size={24} />
            </button>
            <Add 
              token={token} 
              productToEdit={productToEdit} 
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default List

