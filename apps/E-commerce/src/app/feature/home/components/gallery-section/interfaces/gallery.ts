export interface GalleryImage {
  src: string;
  altKey: string;
}

export interface GalleryColumn {
  rowClasses: string;
  images: GalleryImage[];
}