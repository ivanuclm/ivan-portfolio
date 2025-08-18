import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    summary: { type: 'string', required: true },
    minutes: { type: 'number', default: 5 },
    draft: { type: 'boolean', default: false }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: p => p._raw.flattenedPath.replace(/^blog\//, '')
    }
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: { remarkPlugins: [remarkGfm] }
})
