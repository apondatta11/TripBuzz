import { AuthContext } from '@/Provider/AuthContext';
import { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const ManagePackages = () => {
  const { user } = use(AuthContext);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/packages?email=${user.email}`) 
      .then(res => res.json())
      .then(data => setPackages(data));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the package!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/packages/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setPackages(prev => prev.filter(pkg => pkg._id !== id));
              Swal.fire('Deleted!', 'Package has been deleted.', 'success');
            }
          });
      }
    });
  };

  const handlePackageUpdate = (id, updatedData) => {
    setPackages(prev =>
      prev.map(pkg => (pkg._id === id ? { ...pkg, ...updatedData } : pkg))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-accent mb-6">
        🧳 Manage My Tour Packages
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Tour Name</th>
              <th>Price</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr key={pkg._id}>
                <th>{index + 1}</th>
                <td>{pkg.tourName}</td>
                <td>৳{pkg.price}</td>
                <td>{pkg.destination}</td>
                <td>{pkg.departureDate}</td>
                <td>
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="btn btn-xs btn-info mr-1"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setEditingPackage(pkg)}
                    className="btn btn-xs btn-warning mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedPackage && (
        <dialog id="view_modal" className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-xl mb-2">{selectedPackage.tourName}</h3>
            <img src={selectedPackage.image} alt="Tour" className="rounded-lg mb-4 w-full h-60 object-cover" />
            <p><strong>Duration:</strong> {selectedPackage.duration}</p>
            <p><strong>Departure Date:</strong> {selectedPackage.departureDate}</p>
            <p><strong>From:</strong> {selectedPackage.departureLocation}</p>
            <p><strong>To:</strong> {selectedPackage.destination}</p>
            <p><strong>Price:</strong> ৳{selectedPackage.price}</p>
            <p><strong>Contact:</strong> {selectedPackage.contact}</p>
            <p className="mt-2"><strong>Details:</strong> {selectedPackage.details}</p>
            <p className="mt-4"><strong>Guide:</strong> {selectedPackage.guideName} | {selectedPackage.guideEmail}</p>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedPackage(null)}>Close</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Edit Modal (outside return) */}
      {editingPackage && <EditModal />}
    </div>
  );

  // Edit Modal component inside this file
  function EditModal() {
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;

      const updated = {
        tourName: form.tourName.value,
        image: form.image.value,
        duration: form.duration.value,
        departureDate: form.departureDate.value,
        departureLocation: form.departureLocation.value,
        destination: form.destination.value,
        price: parseFloat(form.price.value),
        contact: form.contact.value,
        details: form.details.value,
        guideName: form.guideName.value,
        guideEmail: form.guideEmail.value,
        guidePhoto: form.guidePhoto.value,
      };

      fetch(`http://localhost:4000/packages/${editingPackage._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
        .then(res => res.json())
        .then(data => {
          if (data.modifiedCount > 0) {
            Swal.fire('Success!', 'Package updated successfully!', 'success');
            handlePackageUpdate(editingPackage._id, updated);
            setEditingPackage(null);
          }
        });
    };

    return (
      <dialog id="edit_modal" className="modal modal-open">
        <div className="modal-box max-w-4xl">
          <h3 className="text-2xl font-bold text-accent mb-4">🛠 Edit Tour Package</h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block font-medium mb-1">Tour Name</label>
              <input type="text" name="tourName" defaultValue={editingPackage.tourName} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block font-medium mb-1">Tour Image</label>
              <input type="url" name="image" defaultValue={editingPackage.image} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block font-medium mb-1">Duration</label>
              <input type="text" name="duration" defaultValue={editingPackage.duration} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block font-medium mb-1">Departure Date</label>
              <input type="date" name="departureDate" defaultValue={editingPackage.departureDate} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block font-medium mb-1">Departure Location</label>
              <input type="text" name="departureLocation" defaultValue={editingPackage.departureLocation} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block font-medium mb-1">Destination</label>
              <input type="text" name="destination" defaultValue={editingPackage.destination} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block font-medium mb-1">Price (in BDT)</label>
              <input type="number" name="price" defaultValue={editingPackage.price} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="block font-medium mb-1">Contact Number</label>
              <input type="tel" name="contact" defaultValue={editingPackage.contact} className="input input-bordered w-full" required />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Package Details</label>
              <textarea name="details" defaultValue={editingPackage.details} rows="4" className="textarea textarea-bordered w-full" required></textarea>
            </div>

            <div className="md:col-span-2 border-t pt-6 mt-4">
              <h3 className="text-xl font-semibold mb-4 text-primary">👨‍💼 Guide Info</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <input type="text" name="guideName" defaultValue={editingPackage.guideName} className="input input-bordered w-full" readOnly />
                <input type="email" name="guideEmail" defaultValue={editingPackage.guideEmail} className="input input-bordered w-full" readOnly />
                <input type="url" name="guidePhoto" defaultValue={editingPackage.guidePhoto} className="input input-bordered w-full" readOnly />
              </div>
            </div>

            <div className="md:col-span-2 text-center mt-6">
              <button type="submit" className="btn bg-accent text-white hover:bg-accent/90 px-6">Save Changes</button>
              <button type="button" onClick={() => setEditingPackage(null)} className="btn ml-4">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
};

export default ManagePackages;
