import {
  InlineToolbarFeature,
  StrikethroughFeature,
  FixedToolbarFeature,
  ParagraphFeature,
  UnderlineFeature,
  HeadingFeature,
  ItalicFeature,
  BoldFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  fields: [
    {
      /** Title field https://payloadcms.com/docs/fields/text */
      name: 'title',
      type: 'text',
    },
    {
      /** RichText field https://payloadcms.com/docs/fields/rich-text */
      editor: lexicalEditor({
        features: () => [
          InlineToolbarFeature(),
          FixedToolbarFeature(),
          HeadingFeature({
            enabledHeadingSizes: ['h2', 'h3', 'h4'],
          }),
          StrikethroughFeature(),
          UnderlineFeature(),
          ParagraphFeature(),
          ItalicFeature(),
          BoldFeature(),

          // Lexical => JSX converter: Link converter: found internal link, but internalDocToHref is not provided
          LinkFeature({
            enabledCollections: ['pages', 'media'],
            fields: ({ defaultFields }) => [
              ...defaultFields,
              {
                defaultValue: ['noopener', 'noreferrer', 'nofollow'],
                name: 'rel',
                label: 'Rel Attribute',
                type: 'select',
                hasMany: true,
                options: ['noopener', 'noreferrer', 'nofollow'],
              },
            ],
          }),
        ],
      }),
      label: false,
      name: 'richText',
      type: 'richText',
    },
  ],
  slug: 'pages',
}
