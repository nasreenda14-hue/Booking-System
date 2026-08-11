import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api.js";



const BookingForm = () => {

  const { providerId, serviceId } = useParams();
  const navigate = useNavigate();

  console.log("booking form",{providerId, serviceId})

  const [provider, setProvider] = useState(null);
  const [service, setService] = useState(null);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");

  // Fetch provider + service details
  useEffect(() => {

    const fetchData = async () => {

      const res = await API.get(`/providers/${providerId}`);

      const providerData = res.data.provider;
      setProvider(providerData);

      console.log(providerData.services)
      
      const selected = providerData.services.find(
        (s) => s.service?._id?.toString() === serviceId.toString()
      );

      setService(selected);
    };

    if (providerId) fetchData();

  }, [providerId, serviceId]);

  // Submit booking
  const handleBooking = async (e) => {
    e.preventDefault();

    try {

      await API.post("/booking", {
        provider: providerId,
        service: serviceId,
        name,
        address,
        phone,
        date,
      });

      alert("Booking Confirmed ✅");
      navigate("/"); 

    } catch (err) {
      console.log("ERROR:", err.response?.data);
  alert(err.response?.data?.message || "Booking Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form
        onSubmit={handleBooking}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >

        <h2 className="text-2xl font-bold mb-5 text-center">
          Confirm Booking
        </h2>

        {/* Provider Info */}
        {provider && (
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">{provider.name}</h3>
            <p className="text-gray-500">{provider.location}</p>
          </div>
        )}

        {/* Selected Service */}
        {service && (
          <div className="mb-4 p-3 bg-gray-100 rounded">
            <p className="font-medium">
              Service: {service.service.name}
            </p>
            <p className="text-green-600">
              Price: ₹{service.price}
            </p>
          </div>
        )}

        {/* Name */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        {/* Phone */}
<input
  type="text"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="w-full mb-4 p-3 border rounded"
  required
/>

{/* Address */}
<textarea
  placeholder="Your Address"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  className="w-full mb-4 p-3 border rounded"
  required
/>

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
        >
          Confirm Booking
        </button>

      </form>
    </div>
  );
};

export default BookingForm;