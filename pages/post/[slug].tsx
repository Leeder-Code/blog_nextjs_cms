import { gql } from 'graphql-request'
import React, { FC } from 'react'
import { GetStaticProps } from 'next'
import gqlClient from '../../lib/gqlConfig'
import NextImage from 'next/image'
import Layout from '../../components/layout/Layout'
import moment from 'moment'

const SLUGS = gql`
  {
    posts {
      id
      slug
    }
  }
`

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      title
      slug
      id
      createdAt
      content {
        html
      }
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
  }
`

export async function getStaticPaths() {
  const data = await gqlClient.request(SLUGS)
  const posts: { slug: string; id: string }[] = data.posts
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  const data = await gqlClient.request(QUERY, { slug })
  const { post } = data
  return {
    props: { post },
    revalidate: 30,
  }
}

interface PostWithContent extends PostData {
  content: { html: string }
}
interface PostProps {
  post: PostWithContent
}

const Post: FC<PostProps> = ({ post }) => {
  return (
    <Layout>
      <div className="flex flex-col gap-5 mb-4">
        <span className="uppercase font-semibold">
          {post.categories[0].name}
        </span>
        <span className="font-bold text-3xl">{post.title}</span>
        <div>
          {post.categories.map((category) => (
            <span
              key={category.name}
              className="rounded-sm p-1 border border-amber-300 w-fit cursor-pointer uppercase font-semibold text-sm hover:scale-90 hover:shadow-lg transition"
            >
              {category.name}
            </span>
          ))}
          <span className="text-right w-full">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="relative w-full h-72">
        <NextImage src={post.photo.url} layout="fill" />
      </div>
    </Layout>
  )
}

export default Post
