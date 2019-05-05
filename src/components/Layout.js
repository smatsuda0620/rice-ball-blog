import React from 'react'
import { TypographyStyle } from 'react-typography'
import { Helmet } from 'react-helmet'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
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
            max-width: 700px;
            margin: 0 auto;
          `}
        >
          <header css={css`
              padding: ${rhythm(0.25)};
            `
            }
          >
            <Navbar title={data.site.siteMetadata.title} />
          </header>
          <div css={css`
              margin: ${rhythm(1)} ${rhythm(0.5)};
            `}
          >
            {children}
          </div>
          <Footer />
        </div>
      </div>
    )}
  />
)
