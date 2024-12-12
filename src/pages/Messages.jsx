import axios from 'axios'
import { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'

const Messages = () => {
    const [messageList, setMessageList] = useState([])
    
    const fetchList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/contact/list`);
            if (response.data.success) {
                setMessageList(response.data.messages)
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

    return (
        <>
            <div className="py-4 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                <h1 className="text-2xl font-bold mb-6">All Message List</h1>

                {messageList.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200 shadow-lg">
                        <thead className="bg-primary">
                            <tr className='text-white text-left text-xs font-medium  uppercase tracking-wider'>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3 hidden sm:table-cell">From</th>
                                <th scope="col" className="px-6 py-3 hidden sm:table-cell">Email</th>
                                <th scope="col" className="px-6 py-3 hidden md:table-cell">Phone Number</th>
                                <th scope="col" className="px-6 py-3">Messages</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {messageList.map((message) => (
                            <tr key={message.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(message.submittedAt).toISOString().split('T')[0]}
                                    </p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <p className="text-sm font-medium text-gray-900">{message.name}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <p className="text-sm font-medium text-gray-900">{message.email}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <p className="text-sm font-medium text-gray-900">{message.phoneNumber}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className="text-sm font-medium text-gray-900">{message.message}</p>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-xl text-gray-600">There's no message</p>
                )}
            </div>
        </>
    )
}

export default Messages