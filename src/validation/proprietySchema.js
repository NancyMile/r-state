export const validationSchema = {
    title (value) {
      if (value?.length >= 6 ) return true
      return 'The title is compulsory'
    },
    price (value) {
      if (/^[0-9]+$/.test(value)) return true
      return 'Price should be numeric'
    },
    rooms (value) {
      if (value) return true
      return 'Select number of rooms'
    },
    bathrooms (value) {
      if (value) return true
      return 'Select number of bathrooms'
    },
    garages (value) {
      if (value) return true
      return 'Select number of garages'
    },
    description (value) {
      if (value) return true
      return 'Add description'
    }
} 
  
export const imageSchema = {
  image (value) {
      if (value) return true
      return 'Image is compulsory'
  },
}