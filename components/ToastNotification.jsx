export function ToastNotification({ showToast, item }) {
    if (!showToast) return null
  
    return (
      <div className="fixed z-50 p-4 transform -translate-x-1/2 bg-white rounded-lg shadow-lg bottom-4 left-1/2">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="ml-3 font-medium text-gray-900">{item.name} has been added to your cart!</p>
        </div>
      </div>
    )
  }
  
  