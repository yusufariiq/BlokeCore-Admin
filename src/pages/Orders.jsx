import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-hot-toast'
import { Package } from 'lucide-react'
import { formatIDR } from '../utils/utils'

const orderStatuses = [
  "pending",
  "order placed", 
  "packing",
  "shipped",
  "delivered"
]

const Orders = ({token}) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token){
      return null;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`,{}, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log(response.data);
      
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching orders')
      console.error('Fetch orders error:', error)
    }
  }

  const handleStatusChange = async (event, orderId, newStatus) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, {
        orderId, 
        status:event.target.value
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        await fetchAllOrders();
        toast.success(`Order status updated to ${newStatus}`)
      }else {
        toast.error(response.data.message || 'Failed to update order status')
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">All Customer Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="grid gap-4 grid-cols-1">
          {orders.map((order, index) => (
            <div 
              key={order._id || index} 
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Package className="mr-2 text-primary" />
                    <span className="font-medium">Order #{order._id?.slice(-6)}</span>
                  </div>
                  <select 
                    className="select select-bordered w-full max-w-[140px]"
                    value={order.status}
                    onChange={(event) => handleStatusChange(event, order._id, event.target.value)}
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-gray-500">Amount:</p>
                    <p className="font-medium">Rp {formatIDR(order.amount)}</p>
                    
                    <p className="text-gray-500">Date:</p>
                    <p>{new Date(order.date).toLocaleDateString()}</p>
                    
                    <p className="text-gray-500">Payment:</p>
                    <p className='uppercase'>{order.paymentMethod}</p>
                  </div>
                 
                  <div className="grid grid-cols-2 gap-1">
                    <p className="text-gray-500">Name:</p>
                    <p className="font-medium">{order.shippingAddress.firstName + " " + order.shippingAddress.lastName}</p>

                    <p className="text-gray-500">Phone:</p>
                    <p>{order.shippingAddress.phone}</p>
                    
                    <p className="text-gray-500">Address:</p>
                    <p>{order.shippingAddress.address + ", " + order.shippingAddress.city + ", " + order.shippingAddress.state + ", " + order.shippingAddress.zipCode + ", " + order.shippingAddress.country }</p>
                  </div>
                </div>

                <div className="border-t pt-2 mt-2">
                    <p className="font-medium mb-1">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between text-base">
                          <span className="flex-1">
                            {item.name}
                            {item.size && <span className="text-gray-500 ml-1">({item.size})</span>}
                          </span>
                          <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders