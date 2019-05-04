import React from 'react'
import { TypographyStyle } from 'react-typography'
import { Helmet } from 'react-helmet'
import Navbar from '@components/Navbar'
import { css } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby'
import typography, { rhythm } from '@utils/typography'

import './all.scss'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>
            {data.site.siteMetadata.title}
          </title>
          <meta name="description" content={data.site.siteMetadata.description} />
          <TypographyStyle typography={typography} />
        </Helmet>
        <div
          css={css`
            display: box;
            margin: 0 auto;
            max-width: 700px;
          `}
        >
          <header css={css`
              margin-buttom: ${rhythm(2)};
            `
            }
          >
            <Navbar title={data.site.siteMetadata.title} />
          </header>
          <div css={css`
              margin: ${rhythm(1)} ${rhythm(0.5)} ${rhythm(1)};
            `}
          >
            {children}
          </div>
          <footer css={css`
              margin: 0 ${rhythm(0.5)} ${rhythm(1)};
            `}
          >
          ©
            {' '}
            {new Date().getFullYear()}
              , Built with
            {' '}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    )}
  />
)
