import type { NextPage } from 'next'
import { gql } from 'graphql-request'
import PostCard from '../components/PostCard'
import gqlClient from '../lib/gqlConfig'
import Layout from '../components/layout/Layout'

const QUERY = gql`
  {
    posts(orderBy: createdAt_DESC) {
      title
      slug
      id
      createdAt
      photo {
        url
      }
      categories {
        name
      }
      blogUser {
        nick
        photo {
          url
        }
      }
    }
    categories {
      name
    }
  }
`

interface PostGQLData {
  posts: PostData[]
  categories: Category[]
}

export async function getStaticProps() {
  const data: PostGQLData = await gqlClient.request(QUERY)
  const { posts, categories } = data
  return {
    props: { posts, categories },
    revalidate: 30,
  }
}

const Home: NextPage<PostGQLData> = ({ posts, categories }) => {
  return (
    <Layout categories={categories}>
      <section className="flex flex-col items-center justify-center m-auto gap-3">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </section>
    </Layout>
  )
}

export default Home
