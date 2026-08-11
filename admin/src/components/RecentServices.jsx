
const RecentServices = ({ services }) => {
  return (
    <div className="mt-10">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Quick Overview
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-6 border-b">

          <h3 className="font-bold text-gray-800">
            Recent Services
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Services currently available on Easy Book
          </p>

        </div>

        {services.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            No services available.
          </div>

        ) : (

          <div className="divide-y">

            {services.slice(0, 5).map((service) => (

              <div
                key={service._id}
                className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={
                      service.image ||
                      "https://via.placeholder.com/80"
                    }
                    alt={service.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />

                  <div>

                    <h4 className="font-semibold text-gray-800">
                      {service.name}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      {service.serviceMode === "Home"
                        ? "Home Service"
                        : "Visit Provider"}
                    </p>

                  </div>

                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    service.serviceMode === "Home"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {service.serviceMode === "Home"
                    ? "Home"
                    : "Visit"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default RecentServices;
