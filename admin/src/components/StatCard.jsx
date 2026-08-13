const StatCard = ({ title, value, icon, iconBg }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${iconBg}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
