'use client';
import { ICar } from '@/types/car';
import CarCard from './CarCard';
import Pagination from './Pagination';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from './Select';
import { sortOptions } from '@/utils/constants/cars';

interface IProps {
  data: ICar[];
  page?: string;
  order?: string;
  lastPage?: number;
}
const CarsGrid = ({ data, page: propPage, order, lastPage }: IProps) => {
  const router = useRouter();

  const [page, setPage] = useState(Number(propPage));
  const [sort, setSort] = useState<string>(order || 'none');

  const handleSetPage = (value: number) => {
    setPage(value);
    router.push(`?page=${value}`);
  };

  const handleSetSort = (value: string) => {
    setSort(value);

    if (value !== 'none') {
      router.push(`?page=${page}&order=${value}`);
    } else {
      router.push(`?page=${page}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-5">
      <div className="p-2 rounded bg-white">
        <Select
          options={sortOptions}
          value={sort}
          placeholder="Сортировать"
          onChange={handleSetSort}
          className="w-full sm:w-64"
        />
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {data.map((car, idx) => (
          <CarCard key={idx} data={car} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={lastPage || 0} onPageChange={handleSetPage} />
    </div>
  );
};

export default CarsGrid;
