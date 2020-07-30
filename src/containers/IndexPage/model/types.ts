export interface IAlbum {
  id: string
  artists: {
    id: string
    name: string
  }[]
  total_tracks: number
  name: string
  label: string
  images: {
    width: number
    height: number
    url: string
  }[]
  tracks: {
    id: string
    name: string
    preview_url: string | null
  }[]
}

export interface IAlbums {
  albums: IAlbum[]
}
