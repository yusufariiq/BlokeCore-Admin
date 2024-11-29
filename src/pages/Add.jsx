import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { Upload, X, Loader2 } from 'lucide-react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-hot-toast'

const CONDITIONS = ['Brand New', 'Excellent', 'Very Good', 'Good', 'Mint']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const SUBCATEGORIES = {
  clubs: ['English', 'Spain', 'France', 'German', 'Italy', 'Others'],
  nations: ['Europe', 'Asia', 'America', 'Africa', 'Oceania'],
  others: ['Basketball', 'Baseball'],
}

const Add = ({ token, productToEdit = null, onUpdateSuccess }) => {
  const [selectedImages, setSelectedImages] = useState([null, null, null, null])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    if (productToEdit) {
      setIsEditMode(true)
      // Populate form with existing product data
      setSelectedCategory(productToEdit.category);
      setSelectedSizes(productToEdit.details.size || []);
      setSubcategories(SUBCATEGORIES[productToEdit.category] || []);

      // Populate form fields
      setTimeout(() => {
        const form = document.querySelector('form');
        form.name.value = productToEdit.name;
        form.description.value = productToEdit.description;
        form.category.value = productToEdit.category;
        form.subCategory.value = productToEdit.subCategory;
        form.price.value = productToEdit.price;
        form.year.value = productToEdit.details.year;
        form.condition.value = productToEdit.details.condition;
        form.brand.value = productToEdit.details.brand;
        form.type.value = productToEdit.details.type;
        form.team.value = productToEdit.metadata.team;
        form.league.value = productToEdit.metadata.league;
        form.season.value = productToEdit.metadata.season;

        // Set checkbox values
        form.isAuthentic.checked = productToEdit.details.isAuthentic;
        form.isVintage.checked = productToEdit.details.isVintage;
        form.isLatest.checked = productToEdit.details.isLatest;

        // Populate images if needed
        if (productToEdit.images) {
          const fetchAndConvertImages = async () => {
            // Create a new array of 4 elements, fill with existing or null
            const fetchedImages = await Promise.all(
              Array(4).fill(null).map(async (_, index) => {
                if (productToEdit.images[index]) {
                  const response = await fetch(productToEdit.images[index]);
                  const blob = await response.blob();
                  return new File([blob], `image${index + 1}`, { type: 'image/jpeg' });
                }
                return null;
              })
            );
            setSelectedImages(fetchedImages);
          };
          fetchAndConvertImages();
        }
      }, 100);
    }
  }, [productToEdit])
  
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

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    
    if (SUBCATEGORIES[category]) {
      setSubcategories(SUBCATEGORIES[category]);
    } else {
      setSubcategories([]);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsSubmitting(true)
      const formData = new FormData()
  
      // Image uploads
      selectedImages.forEach((image, index) => {
        if(image) {
          formData.append(`image${index + 1}`, image)
        }
      })
  
      const form = e.target
  
      // Capitalize first letter of each word for condition
      const formatCondition = (condition) => {
        return condition
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      }
  
      // Structured details object
      const details = {
        year: form.year.value,
        condition: formatCondition(form.condition.value),
        size: selectedSizes,
        brand: form.brand.value,
        type: form.type.value,
        isAuthentic: form.isAuthentic.checked,
        isVintage: form.isVintage.checked,
        isLatest: form.isLatest.checked
      }
  
      // Metadata object
      const metadata = {
        team: form.team.value,
        league: form.league.value,
        season: form.season.value
      }

      const url = isEditMode 
        ? `${backendUrl}/api/product/update/${productToEdit.id}`
        : `${backendUrl}/api/product/add`

      // Append core fields
      formData.append('name', form.name.value)
      formData.append('description', form.description.value)
      formData.append('price', form.price.value)
      formData.append('category', form.category.value)
      formData.append('subCategory', form.subCategory.value)

      // Append structured objects as JSON strings
      formData.append('details', JSON.stringify(details))
      formData.append('metadata', JSON.stringify(metadata))
  
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type' : 'multipart/form-data',
          'token': token
        }
      })
      
      toast.success(isEditMode ? 'Product updated successfully' : 'Product added successfully')

      e.target.reset()
      setSelectedImages([null, null, null, null])
      setSelectedSizes([])
    
      if (isEditMode && onUpdateSuccess) {
        onUpdateSuccess()
      }
    } catch (error) {
      console.error('Error processing product:', error.response?.data || error)
      toast.error(isEditMode ? 'Failed to update product' : 'Failed to add product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
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
                          className="absolute top-2 right-2"
                        >
                          <X/>
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
                          id={`image${index}`}
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
                  <select 
                    name="category" 
                    className="select select-bordered w-full" 
                    defaultValue={""} 
                    required
                    onChange={handleCategoryChange}
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="clubs">Clubs</option>
                    <option value="nations">Nations</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Sub Category</span>
                  </label>
                  <select 
                    name="subCategory" 
                    className="select select-bordered w-full" 
                    defaultValue={""} 
                    required
                    disabled={!selectedCategory}
                  >
                    <option value="" disabled>Select Sub Category</option>
                    {subcategories.map((subCategory) => (
                      <option 
                        key={subCategory.toLowerCase()} 
                        value={subCategory.toLowerCase()}
                      >
                        {subCategory}
                      </option>
                    ))}
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
                  <select name="condition" className="select select-bordered w-full" defaultValue={""} required>
                    {CONDITIONS.map((condition) => (
                        <option key={condition} value={condition}>{condition}</option>
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
                      <span className={`btn btn-sm ${selectedSizes.includes(size) ? 'bg-primary text-white hover:bg-hover-primary' : 'btn-outline'}`}>
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Authentic Product</span> 
                  <input type="checkbox" name="isAuthentic"/>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Vintage Product</span> 
                  <input type="checkbox" name="isVintage"/>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Latest Product</span> 
                  <input type="checkbox" name="isLatest"/>
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
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary mx-7 px-5 py-4 rounded-lg w-full font-semibold text-white text-lg flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  {isEditMode ? 'Updating Product...' : 'Adding Product...'}
                </>
              ) : (
                isEditMode ? 'Update Product' : 'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Add;