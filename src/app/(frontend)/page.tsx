import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import RichText from '@/components/richtext'
import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const data = await payload.findByID({
    collection: 'pages',
    id: '1',
  })

  if (!data) {
    return <div>No data found</div>
  }

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

      <div className="content">
        <>{data.richText && <RichText data={data.richText} />}</>
      </div>
    </div>
  )
}
