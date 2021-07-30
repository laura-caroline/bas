
export interface Advertising{
  id: number,
  id_user: number,
  id_category: number,
  title: string,
  description: string,
  value: number,
  created: Date,
  images_advertisings: [
    {
      id: number,
      id_advertising: number,
      image: string
    }
  ]
}