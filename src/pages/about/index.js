import React from 'react'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'

export default () => (
  <Layout>
    <p>準備中</p>
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
