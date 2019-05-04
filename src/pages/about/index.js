import React from 'react'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'

export default () => (
  <Layout>
    <p>test</p>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
