import { ICar, IPaginatedMeta } from '@/types/car';

export function getCars({
  page,
  limit = '12',
  order
}: {
  page: string | number;
  limit?: string
  order?: string 
}): Promise<{ data: ICar[]; meta: IPaginatedMeta } | null> {
  const url = order ? `cars?_limit=${limit}&_page=${page}&_sort=price&_order=${order}` : `cars?_limit=${limit}&_page=${page}`
  console.log({
    order,
    page
  });
  
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`)
    .then(res => res.json())
    .then(res => res || null)
    .catch(err => {
      console.error('Failed to fetch cars:', err);
      return null;
    });
}
