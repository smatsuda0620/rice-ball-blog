import React from 'react'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'

import PropTypes from 'prop-types';

export const MyFiles = () => (
  <Layout>
    <div>Hello world</div>
  </Layout>
)

MyFiles.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.array,
  }),
}

MyFiles.defaultProps = {
  data: {
    allMarkdownRemark: [],
  },
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
