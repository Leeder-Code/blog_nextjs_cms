import React, { FC } from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import moment from 'moment'

const PostCard: FC<PostData> = ({
  blogUser,
  categories,
  photo,
  slug,
  title,
  createdAt,
}) => {
  return (
    <div className="w-full">
      <div className="flex">
        <Link href={`post/${slug}`}>
          <NextImage
            className="rounded-md cursor-pointer hover:opacity-90 transition"
            objectFit="cover"
            src={photo.url}
            width={300}
            height={200}
          />
        </Link>
        <div className="flex flex-col w-full px-2">
          <span className="uppercase font-semibold">{categories[0].name}</span>
          <Link href={`post/${slug}`}>
            <span className="my-auto max-w-xs cursor-pointer font-bold underline-offset-2 hover:underline sm:text-lg md:text-xl">
              {title}
            </span>
          </Link>
          <div className="flex justify-between items-end">
            <p className="text-gray-400 text-xs md:text-sm">
              {moment(createdAt).fromNow()}
            </p>
            <div className="flex items-center gap-2 ">
              <p className="text-gray-700 font-light font-serif text-sm md:text-base">
                {blogUser.nick}
              </p>
              <div className="rounded-full overflow-hidden h-8 w-8 md:h-12 md:w-12 relative">
                <NextImage
                  src={blogUser.photo.url}
                  layout="fill"
                  objectFit="fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
