import { Camera } from "lucide-react"

const ImagePreview = ({ imagePreview, onImageClick }) => (
  <div
    className="w-full h-48 md:h-64 rounded-lg bg-orange-100 flex items-center justify-center overflow-hidden border-2 border-orange-200 cursor-pointer"
    onClick={onImageClick}
  >
    {imagePreview ? (
      <img src={imagePreview || "/placeholder.svg"} alt="Item preview" className="w-full h-full object-cover" />
    ) : (
      <Camera className="w-16 h-16 text-orange-300" />
    )}
  </div>
)

export default ImagePreview

