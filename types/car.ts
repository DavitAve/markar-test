export interface ICar {
  mark_id: string;
  model_name: string;
  folder_id: string;
  year: number;
  body_type: string;
  availability: string;
  price: number;
  engine_power: string;
  engine_type: string;
  gearbox: string;
  images: {
    image: string[];
  };
  run: number;
  color: string;
  state: string;
  owners_number: number;
}

export interface IPaginatedMeta {
  limit: number;
  page: number;
  total_no_filters: number;
  count: number;
  total: number;
  last_page: number;
  first_page_link: string;
  next_page_link: string;
  last_page_link: string;
  from: number;
  to: number;
}
