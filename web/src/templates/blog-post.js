import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import GraphQlErrorList from "../components/GraphqlErrorList"
import BlogPost from "../components/blogpost"
import SEO from "../components/seo"
import Layout from "../containers/layout"

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
      title
      slug {
        current
      }
      _rawBody
    }
  }
`

const BlogPostTemplate = props => {
  const { data, errors } = props
  const post = data && data.post
  return (
    <Layout>
      {errors && <SEO title="Graphql Error" />}
      {post && <SEO title={post.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQlErrorList errors={errors} />
        </Container>
      )}

      {post && <BlogPost {...post} />}
    </Layout>
  )
}

export default BlogPostTemplate
