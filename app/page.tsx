import CarsGrid from '@/components/CarsGrid';
import { getCars } from '@/lib/api/cars';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Home = async ({ searchParams }: Props) => {
  const { page = '1', order = 'none' } = await searchParams;

  const res = await getCars({ page: page.toString(), order: order?.toString() });

  return (
    <div className="flex flex-col gap-4 container mx-auto pt-4 sm:px-0 px-3">
      <h1 className="text-4xl">Каталог машин</h1>
      {res ? <CarsGrid data={res.data} page={page.toString()} order={order?.toString()} /> : <div>No Data</div>}
    </div>
  );
};

export default Home;
