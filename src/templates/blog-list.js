import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '@utils/typography'
import Layout from '@components/Layout'

import PropTypes from 'prop-types';

const BlogList = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return (
    <Layout>
      <div>
        <h2
          css={css`
              display: inline-block;
              margin-bottom: ${rhythm(1)};
              font-size: 1.2rem;
              text-decoration: underline;
            `}
        >
            Articles
        </h2>
        {posts.map(({ node }) => (
          <div
            key={node.id}
            css={css`
              text-decoration: none;
              margin-bottom: ${rhythm(1)};
            `}
          >
            <Link
              to={node.fields.slug}
              css={css`
                display: inline-block;
            `}
            >
              <h2
                css={css`
                    margin-bottom: 0;
                    color: #3498DB;
                    font-size: 1.5rem;
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
              </h2>
              <p
                css={css`
                    font-size: 1.0rem;
                    color: black;
                  `
                  }
              >
                {node.frontmatter.description}
              </p>
            </Link>
          </div>
        ))}
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/${i === 0 ? '' : i + 1}`}
                style={{
                  padding: rhythm(1 / 4),
                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#ffffff' : '',
                  background: i + 1 === currentPage ? '#007acc' : '',
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </ul>
      </div>
    </Layout>
  )
}

BlogList.propTypes = {
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
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
  }).isRequired,
}

export default BlogList

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip      
      ) {
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
