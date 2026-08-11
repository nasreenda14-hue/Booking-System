
const ManagementCard = ({
  icon,
  iconBg,
  title,
  description,
  buttonText,
  buttonColor,
  onClick,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

      <div className="flex items-start gap-4">

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${iconBg}`}
        >
          {icon}
        </div>

        <div className="flex-1">

          <h3 className="text-lg font-bold text-gray-800">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>

        </div>

      </div>

      <button
        onClick={onClick}
        className={`w-full mt-5 text-white py-3 rounded-xl font-semibold transition ${buttonColor}`}
      >
        {buttonText}
      </button>

    </div>
  );
};

export default ManagementCard;

