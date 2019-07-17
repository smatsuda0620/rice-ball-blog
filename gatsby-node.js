const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
    `).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        // Create Blog pages
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/blog-post.js'),
            context: {
              slug: node.fields.slug,
            },
          })
        })

        // Create Blog List
        const posts = result.data.allMarkdownRemark.edges
        const postsPerPage = 6
        const numPages = Math.ceil(posts.length / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/blog/' : `/blog/${i + 1}`,
            component: path.resolve('./src/templates/blog-list.js'),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })
      }),
    )
  })
}
