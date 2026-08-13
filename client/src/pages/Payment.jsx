import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api.js";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const res = await API.get(`/booking/${bookingId}`);

      setBooking(res.data.booking);
    } catch (error) {
      console.error("Booking error:", error);

      alert(error.response?.data?.message || "Unable to load booking");

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setPaying(true);

      const res = await API.post("/payment/create", {
        bookingId,
      });

      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Payment error:", error);

      alert(error.response?.data?.message || "Unable to start payment");

      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading booking...</p>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Header */}

        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            💳
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Confirm & Pay
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Complete your payment to confirm your booking
          </p>
        </div>

        {/* Booking details */}

        <div className="bg-gray-50 rounded-xl p-5 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>

            <span className="font-semibold text-gray-800">
              {new Date(booking.date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Time</span>

            <span className="font-semibold text-gray-800">{booking.time}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>

            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
              Payment Pending
            </span>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total</span>

            <span className="text-2xl font-bold text-green-600">
              AED {booking.price}
            </span>
          </div>
        </div>

        {/* Payment button */}

        <button
          onClick={handlePayment}
          disabled={paying}
          className="w-full mt-6 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition"
        >
          {paying ? "Opening Payment..." : `Pay AED ${booking.price}`}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          You will be redirected to Stripe's secure checkout.
        </p>
      </div>
    </div>
  );
};

export default Payment;
