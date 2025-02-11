import { getPayload } from 'payload'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

import RichText from '@/components/richtext'
import config from '@/payload.config'
import '../styles.css'

export default async function HomePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const pageId = id?.toString() || '1'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const data = await payload.findByID({
    collection: 'pages',
    id: pageId,
  })

  if (!data) redirect('/')

  return (
    <div className="home">
      <a
        className="admin"
        href={payloadConfig.routes.admin}
        rel="noopener noreferrer"
        target="_blank"
      >
        ADMIN
      </a>

      <a href="/" className="home-link">
        HOME
      </a>

      <div className="content">
        <>{data.richText && <RichText data={data.richText} />}</>
      </div>
    </div>
  )
}
