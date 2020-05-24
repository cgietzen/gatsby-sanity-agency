const { format } = require("date-fns")

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * Generates Blog Posts
 */

async function createBlogPostPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges.forEach((edge, index) => {
    const { id, slug = {}, publishedAt } = edge.node
    // const dateSegment = format(publishedAt, "YYYY/MM")
    const path = `/blog/${slug.current}`

    reporter.info(`Creating blog post page: ${path}...`)

    createPage({
      path,
      component: require.resolve("./src/templates/blog-post.js"),
      context: { id },
    })
  })
}

/**
 * Generates Project Pages
 */

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || {}

  projectEdges.forEach((edge, index) => {
    const { id, slug = {} } = edge.node
    const path = `/work/${slug.current}`

    reporter.info(`Creating project post page: ${path}...`)

    createPage({
      path,
      component: require.resolve("./src/templates/project.js"),
      context: { id },
    })
  })
}

/**
 * Generates Service Pages
 */

async function createServicePages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityService(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const serviceEdges = (result.data.allSanityService || {}).edges || {}

  serviceEdges.forEach((edge, index) => {
    const { id, slug = {} } = edge.node
    const path = `/services/${slug.current}`

    reporter.info(`Creating service page: ${path}...`)

    createPage({
      path,
      component: require.resolve("./src/templates/service.js"),
      context: { id },
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter)
  await createProjectPages(graphql, actions, reporter)
  await createServicePages(graphql, actions, reporter)
}
