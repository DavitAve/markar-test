import CarsGrid from '@/components/CarsGrid';
import { getCars } from '@/lib/api/cars';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  return searchParams
}

const Home = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const { page = '1', order = 'none' } = searchParams;

  const res = await getCars({ page: page.toString(), order: order?.toString() });

  return (
    <div className="flex flex-col gap-4 container mx-auto pt-4 sm:px-0 px-3">
      <h1 className="text-4xl font-bold text-gray-800">Каталог машин</h1>

      {res && res.data.length > 0 ? (
        <CarsGrid
          data={res.data}
          page={page.toString()}
          order={order?.toString()}
          lastPage={res.meta.last_page}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-20 bg-gray-50 border border-dashed border-gray-300 rounded-md">
          <h2 className="text-xl font-semibold text-gray-700">Машины не найдены</h2>
          <p className="text-sm text-gray-500">
            Попробуйте изменить параметры фильтрации или вернуться позже.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
