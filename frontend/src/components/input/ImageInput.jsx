import React from 'react'

const ImageInput = () => {
  return (
    <div>
        <label>Image</label>
        <input type="file" accept="image/*" name='image' />
    </div>
  )
}

export default ImageInput