import { gql } from 'graphql-request'
import React, { FC } from 'react'
import { GetStaticProps } from 'next'
import gqlClient from '../../lib/gqlConfig'
import NextImage from 'next/image'
import Layout from '../../components/layout/Layout'
import moment from 'moment'
import Link from 'next/link'

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
        <div className="flex justify-between items-end">
          <div className="flex gap-2">
            {post.categories.map((category) => (
              <span
                key={category.name}
                className="rounded-sm block p-1 border border-amber-300 w-fit cursor-pointer uppercase font-semibold text-sm hover:scale-90 hover:shadow-lg transition"
              >
                {category.name}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-400">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="relative w-full h-72">
        <NextImage src={post.photo.url} layout="fill" />
      </div>
      <div className="flex flex-col items-center pt-4 gap-2">
        <NextImage
          src={post.blogUser.photo.url}
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
        <span className='text-lg font-semibold transition'>{post.blogUser.nick}</span>
      </div>
      <hr className="border-stone-600 opacity-40 my-4" />
      <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
      <Link href="/">
        <div className="rounded-md p-2 uppercase my-4 text-lg text-white cursor-pointer w-3/4 text-center m-auto bg-slate-500">
          More from {post.categories[0].name}
        </div>
      </Link>
    </Layout>
  )
}

export default Post
