import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

import {
  RichText as RichTextWithoutBlocks,
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...LinkJSXConverter,
  ...defaultConverters,
})

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText({ className, ...rest }: Props) {
  return <RichTextWithoutBlocks converters={jsxConverters} className={className} {...rest} />
}
