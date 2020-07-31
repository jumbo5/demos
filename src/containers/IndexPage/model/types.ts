export interface IArtist {
  id: string
  name: string
}

export interface IImage {
  width: number
  height: number
  url: string
}

export interface IAlbumTrack {
  id: string
  name: string
  preview_url: string | null
  artists: IArtist[]
}

export interface IExtendedAlbumTracks extends IAlbumTrack {
  images: IImage[]
}

export interface IAlbum {
  id: string
  artists: {
    id: string
    name: string
  }[]
  total_tracks: number
  name: string
  label: string
  images: IImage[]
  tracks: {
    items: IAlbumTrack[]
  }
}

export interface IAlbums {
  albums: IAlbum[]
}
