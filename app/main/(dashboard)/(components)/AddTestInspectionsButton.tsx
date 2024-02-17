"use client"
function AddTestInspectionsButton({ updateItem }: any) {
  return (
    <button className="bg-yellow-500 rounded-lg p-4" onClick={updateItem()}>
      Add Testing Inspections
    </button>
  )
}

export default AddTestInspectionsButton
