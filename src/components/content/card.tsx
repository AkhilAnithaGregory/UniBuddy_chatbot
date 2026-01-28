type DasboardCardType = {
  img: string;
  value: string;
};

export const DashboardCard = ({ img, name, value }: DasboardCardType) => {
  return (
    <div className="relative">
      <img src={img} alt="streak" className="w-full" />
      <p className="absolute bottom-6 w-full text-center font-bold text-white text-2xl">{value}</p>
    </div>
  );
};
