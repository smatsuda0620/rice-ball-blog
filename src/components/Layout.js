import React from 'react'
import { TypographyStyle } from 'react-typography'
import { Helmet } from 'react-helmet'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import { css } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby'
import typography, { rhythm } from '@utils/typography'
import onigiriImage from '@images/onigiri.png'
import './layout.scss'

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
            <p
              css={css`
              font-size: 1.1rem;
              margin: ${rhythm(0.5)};
              `}
            >
              Web development blog written by
              {' '}
              <a href="https://twitter.com/onigiri_">
                <img
                  css={css`
                  position: relative;
                  bottom: -${rhythm(0.2)};
                  width: ${rhythm(1.1)};
                  height: ${rhythm(1.1)};
                  margin: 0 ${rhythm(0.2)};
                `}
                  src={onigiriImage}
                  alt="Logo"
                />
              </a>
              {' '}
            </p>
          </header>
          <div css={css`
              margin: ${rhythm(2)} ${rhythm(0.5)} ${rhythm(1)};
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
