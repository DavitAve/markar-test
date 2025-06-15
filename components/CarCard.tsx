import { ICar } from '@/types/car';
import Image from 'next/image';

interface IProps {
  data: ICar;
}

const CarCard = ({ data }: IProps) => {
  const isAvailable = data.availability === 'В наличии';

  return (
    <div className="flex flex-col group bg-white overflow-hidden border border-gray-300 rounded-md transition-shadow duration-200">
      <div className="overflow-hidden">
        <Image
          src={data.images.image[0]}
          alt={data.model_name || 'Car image'}
          width={300}
          height={200}
          className="object-contain w-full h-auto transition-transform duration-300 group-hover:scale-110"
          loading='eager'
        />
      </div>

      <div className="p-3 flex flex-col gap-1 flex-auto">
        <div className="flex items-center flex-wrap justify-between">
          <h3 className="font-semibold text-lg">
            {data.mark_id} {data.folder_id}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {data.availability}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {data.year} • {data.body_type}
        </p>

        <div className="flex flex-auto flex-col justify-end pt-2">
          <p className="text-base font-semibold text-blue-700">
            {data.price.toLocaleString('ru-RU')} ₽
          </p>
          <p className="text-sm text-gray-600">
            {data.engine_power} • {data.engine_type} • {data.gearbox}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
