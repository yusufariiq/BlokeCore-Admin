import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { Upload } from 'lucide-react'

const CONDITIONS = ['Brand New', 'Excellent', 'Very Good', 'Good', 'Mint']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const Add = () => {
  const [selectedImages, setSelectedImages] = useState([null, null, null, null])
  const [selectedSizes, setSelectedSizes] = useState([])
  
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0]
    if (file) {
      const newImages = [...selectedImages]
      newImages[index] = file
      setSelectedImages(newImages)
    }
  }

  const removeImage = (index) => {
    const newImages = [...selectedImages]
    newImages[index] = null
    setSelectedImages(newImages)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  return (
    <Layout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload Section */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Upload Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedImages.map((image, index) => (
                  <div 
                    key={index}
                    className="relative aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-base-100 hover:bg-base-200"
                  >
                    {image ? (
                      <>
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="btn btn-circle btn-xs absolute top-2 right-2 bg-error hover:bg-error-focus"
                        >
                        </button>
                      </>
                    ) : (
                      <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <Upload />
                        <span className="text-sm mt-2">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(index, e)}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Basic Information</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input type="text" name="name" placeholder="Enter product name" className="input input-bordered w-full" required />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Product Description</span>
                </label>
                <textarea name="description" placeholder="Write content here" className="textarea textarea-bordered h-24"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select name="category" className="select select-bordered w-full" required>
                    <option disabled selected>Select category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Sub Category</span>
                  </label>
                  <select name="subCategory" className="select select-bordered w-full" required>
                    <option disabled selected>Select sub-category</option>
                    <option value="topwear">Clubs</option>
                    <option value="bottomwear">Nations</option>
                    <option value="footwear">Others</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input type="number" name="price" min="0" step="0.01" placeholder="Enter price" className="input input-bordered w-full" required />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Product Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Year</span>
                  </label>
                  <input type="number" name="year" placeholder="Enter year" className="input input-bordered w-full" required />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Condition</span>
                  </label>
                  <select name="condition" className="select select-bordered w-full" required>
                    <option disabled selected>Select condition</option>
                    {CONDITIONS.map((condition) => (
                      <option key={condition} value={condition.toLowerCase()}>{condition}</option>
                    ))}
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Brand</span>
                  </label>
                  <input type="text" name="brand" placeholder="Enter brand name" className="input input-bordered w-full" required />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Type</span>
                  </label>
                  <input type="text" name="type" placeholder="Enter product type" className="input input-bordered w-full" required />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Available Sizes</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <label key={size} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name="sizes"
                        value={size}
                        className="hidden"
                        checked={selectedSizes.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSizes([...selectedSizes, size])
                          } else {
                            setSelectedSizes(selectedSizes.filter(s => s !== size))
                          }
                        }}
                      />
                      <span className={`btn btn-sm ${selectedSizes.includes(size) ? 'btn-primary' : 'btn-outline'}`}>
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Authentic Product</span> 
                  <input type="checkbox" name="isAuthentic" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Vintage Product</span> 
                  <input type="checkbox" name="isVintage" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Latest Product</span> 
                  <input type="checkbox" name="isLatest" className="checkbox" />
                </label>
              </div>
            </div>
          </div>


          {/* Metadata */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Product Metadata</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Team</span>
                  </label>
                  <input type="text" name="team" placeholder="Enter team name" className="input input-bordered w-full" required />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">League</span>
                  </label>
                  <input type="text" name="league" placeholder="Enter league name" className="input input-bordered w-full" required />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Season</span>
                  </label>
                  <input type="text" name="season" placeholder="Enter season" className="input input-bordered w-full" required />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-primary mx-7 px-5 py-4 rounded-lg w-full font-semibold text-white text-lg">Add Product</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Add;