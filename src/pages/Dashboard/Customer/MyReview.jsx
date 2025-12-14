import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const MyReview = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()

  const [editReview, setEditReview] = useState(null)

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['my-review', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-review/${user.email}`)
      return res.data
    },
  })

  // Delete review
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    })

    if (result.isConfirmed) {
      await axiosSecure.delete(`/my-review/${id}`)
      Swal.fire('Deleted!', 'Review deleted successfully', 'success')
      queryClient.invalidateQueries(['my-review', user?.email])
    }
  }

  // Open modal
  const openModal = (review) => {
    setEditReview({ ...review })
    document.getElementById('my_modal_5').showModal()
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditReview((prev) => ({ ...prev, [name]: value }))
  }

  // Update review
  const handleUpdate = async () => {
    try {
      await axiosSecure.put(`/my-review/${editReview._id}`, {
        rating: Number(editReview.rating),
        comment: editReview.comment,
      })

      Swal.fire('Updated!', 'Review updated successfully', 'success')
      queryClient.invalidateQueries(['my-review', user?.email])
      document.getElementById('my_modal_5').close()
    } catch (err) {
      Swal.fire('Error!', 'Failed to update review', 'error')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews found.</p>
      )}

      {reviews.map((r) => (
        <div key={r._id} className="border rounded-lg p-4 mb-4 bg-white">
          <h3 className="font-semibold">Meal: {r.mealName}</h3>

          <div className="flex justify-between mb-2">
            <p>⭐ {r.rating} / 5</p>
            <small>{new Date(r.date).toLocaleDateString()}</small>
          </div>

          <p className="mb-3">{r.comment}</p>

          <div className="flex gap-3">
            <button
              className="btn btn-sm btn-info"
              onClick={() => openModal(r)}
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={() => handleDelete(r._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ===== UPDATE MODAL ===== */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Review</h3>

          <label className="label">Rating (1–5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={editReview?.rating || ''}
            onChange={handleChange}
            className="input input-bordered w-full mb-3"
          />

          <label className="label">Comment</label>
          <textarea
            name="comment"
            value={editReview?.comment || ''}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mb-4"
          ></textarea>

          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Save
            </button>

            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default MyReview
