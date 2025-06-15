import { ICar } from '@/types/car';
import Image from 'next/image';
import { GaugeCircle, PaintBucket, ShieldCheck, UserCircle2 } from 'lucide-react'; // 👈 Icons here

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
          loading="eager"
        />
      </div>

      <div className="p-3 flex flex-col gap-1 flex-auto">
        <div className="flex flex-col items-start gap-0.5 pb-1">
          <h3 className="font-semibold text-lg">
            {data.mark_id} {data.folder_id}
          </h3>
        </div>

        <p className="text-sm text-gray-500">
          {data.year} • {data.body_type}
        </p>
        <div className="flex-auto flex-col flex pt-3 gap-2">
          <div className="text-sm flex-auto text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <GaugeCircle className="w-4 h-4 text-gray-500" />
              <span>
                Пробег: <span className="font-medium">{data.run.toLocaleString('ru-RU')} км</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PaintBucket className="w-4 h-4 text-gray-500" />
              <span>
                Цвет: <span className="font-medium">{data.color}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-500" />
              <span>
                Состояние: <span className="font-medium">{data.state}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserCircle2 className="w-4 h-4 text-gray-500" />
              <span>
                Владельцев: <span className="font-medium">{data.owners_number}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-base font-semibold text-blue-700">
                {data.price.toLocaleString('ru-RU')} ₽
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {data.availability}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {data.engine_power} • {data.engine_type} • {data.gearbox}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
