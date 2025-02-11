import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'

import {
  RichText as RichTextWithoutBlocks,
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }): string => {
  const { value, relationTo } = linkNode.fields.doc!

  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }

  if (relationTo === 'media') {
    return value.url as string
  }

  return `/${value.id}`
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }), // need to be a second argument
})

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText({ className, ...rest }: Props) {
  return <RichTextWithoutBlocks converters={jsxConverters} className={className} {...rest} />
}
