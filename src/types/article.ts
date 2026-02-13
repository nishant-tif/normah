// Article-related type definitions

export interface Author {
  id?: string;
  author_id?: string;
  author_name: string;
  author_email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id?: string;
  category_id?: string;
  category_name: string;
  status_flag?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface City {
  id?: string;
  city_id?: string;
  cityName: string;
  state_id?: string;
  status_flag?: number;
}

export interface State {
  id?: string;
  state_id?: string;
  stateName: string;
  country_id?: string;
  status_flag?: number;
}

export interface Country {
  id?: string;
  country_id?: string;
  countryName: string;
  status_flag?: number;
}

export interface Article {
  id?: string;
  article_id?: string;
  article_title: string;
  article_slug: string;
  article_content: string;
  article_visibility: "DRAFT" | "PUBLISHED";
  article_excerpt?: string;
  author_id: number;
  article_thumbnail_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  category_ids?: string[];
  categories?: Category[];
  owner?: string;
  owner_details?: Author;
  city_id?: string;
  state_id?: string;
  country_id?: string;
  city?: City;
  state?: State;
  country?: Country;
  published_at?: string;
  status_flag?: number;
  createdAt?: string;
  updatedAt?: string;
  edit_by?: string;
}

export interface ArticleSearchResponse {
  limit: number;
  page: number;
  total: number;
  data: { id: string; article_title: string; author_id: string }[];
  rows: Article[];
  count: number;
}

export interface CreateArticleRequest {
  post_title: string;
  post_slug: string;
  post_content: string;
  post_visibility: "DRAFT" | "PUBLISHED";
  post_excerpt?: string;
  article_thumbnail_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  category_ids: string[];
  city_id?: string;
  state_id?: string;
  country_id?: string;
}

export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {}

export interface PaginationParams {
  page?: number;
  size?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  size: number;
  totalPages: number;
}
