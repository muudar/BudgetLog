import React from 'react';

type Props = {
  categoryName: string;
  emoji: string;
  backgroundColor: string;
  value: number;
};

const CategoryCard = ({
  backgroundColor,
  value,
  emoji,
  categoryName,
}: Props) => {
  return (
    <div
      className={`flex-col rounded-md bg-${backgroundColor} p-2 lg:w-[100px]`}
    >
      <div className="text-sm">{emoji}</div>
      <div className="text-sm">{categoryName}</div>
      <div className="text-sm font-bold">{value} EGP</div>
    </div>
  );
};

export default CategoryCard;
