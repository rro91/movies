export interface Movie {
  id: number,
  poster_path: string,
  original_title: string,
  title: string,
  release_date: string
}

export interface MovieSearchResult {
  page: number,
  results: Movie[],
  total_results: number,
  total_pages: number
}

export interface MovieConfig {
  images: {
    base_url: string,
    poster_sizes: string[]
  }
}
