import {Movie} from "../interfaces/movie.interface";

export const moviesMock: Movie[] = [
  {
    id: 1,
    title: 'Star Wars',
    original_title: 'Star Wars',
    poster_path: '/test-path',
    release_date: new Date().toString()
  },
  {
    id: 2,
    title: 'Lord of the Rings',
    original_title: 'Lord of the Rings',
    poster_path: '/test-path',
    release_date: new Date().toString()
  }
]
