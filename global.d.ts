export {}

declare global {
  type Photo = {
    url: string
  }
  interface BlogUser {
    nick: string
    photo: Photo
  }
  interface Category {
    name: string
  }
  interface PostData {
    blogUser: BlogUser
    categories: Category[]
    id: string
    photo: Photo
    slug: string
    title: string
    createdAt: string
  }
}
