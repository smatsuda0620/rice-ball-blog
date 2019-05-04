import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '@utils/typography'
import Layout from '@components/Layout'

import PropTypes from 'prop-types';

export const IndexPage = ({ data }) => (
  <Layout>
    <div>
      <h4
        css={css`
            display: inline-block;
            margin-top: ${rhythm(1)};
          `}
      >
          最近の日記
      </h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={css`
                text-decoration: none;
                color: inherit;
                margin-bottom: ${rhythm(4)};
              `}
          >
            <h3
              css={css`
                  margin-bottom: 0;
                  color: #3498DB;
                `}
            >
              {node.frontmatter.title}
              {
                  ' '
                }
              <span
                css={css`
                    color: #bbb;
                  `}
              >
                  —
                {' '}
                {node.frontmatter.date}
              </span>
            </h3>
            <p
              css={css`
                  font-size: 1.0rem
                `
                }
            >
              {node.frontmatter.description}
            </p>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          }).isRequired,
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }).isRequired,
        }),
      }).isRequired),
    }).isRequired,
  }).isRequired,
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
