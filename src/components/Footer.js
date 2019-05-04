import React from 'react'
import { css } from '@emotion/core'

import { rhythm } from '@utils/typography'

export default () => (
  <footer css={css`
      margin: 0 ${rhythm(0.5)} ${rhythm(1)};
    `}
  >
    ©
    {' '}
    {new Date().getFullYear()}
    <a href="https://twitter.com/onigiri_"> onigiri_ </a>
      , Built with
    {' '}
    <a href="https://www.gatsbyjs.org">Gatsby</a>
  </footer>
)
