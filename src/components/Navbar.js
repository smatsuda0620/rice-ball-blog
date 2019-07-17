import React from 'react'
import Media from 'react-media';
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { rhythm } from '@utils/typography'
import PropTypes from 'prop-types';

const activeClass = 'is-active';

// NavMenu CSS
const navbarMenuClass = css`
  margin-left: ${rhythm(1)};
  font-size: 1.5rem;
`

// Burger CSS
const navbarBurgerClass = css`
  display: block;
  float: right;
  padding: 0 0.2rem;
`

const navbarBurgerLineClass = css`
  width: 1.8rem;
  height: 0.25rem;
  margin: 0.4rem 0;
  background-color: black;
  border-radius: 3px;
`

const navbarBurgerItemClass = css`
  display: block;
  width: 100%;
  padding: 0.5rem 0;
`

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    const { active } = this.state
    this.setState(
      {
        active: !active,
        navBarActiveClass:
          !active ? activeClass : '',
      },
    )
  }

  render() {
    const { title } = this.props
    const { navBarActiveClass } = this.state
    return (
      <div>
        <Link
          to="/blog/"
          css={css`
              display: inline-block;
              margin: ${rhythm(0.25)};
            `}
        >
          <h2
            css={css`
            display: inline-block;
            padding-left: ${rhythm(0.2)};
            font-size: 1.5rem;
          `}
          >
            { title }
          </h2>
        </Link>
        <Media query="(min-width: 599px)">
          {matches => (matches ? (
            <nav css={css`
                display: block;
                float: right;
              `}
            >
              <Link
                to="/about/"
                css={navbarMenuClass}
              >
                About
              </Link>
              <Link
                to="/blog/"
                css={navbarMenuClass}
              >
                Blog
              </Link>
            </nav>
          ) : (
            <nav css={css`
                display: inline;
              `}
            >
              <button
                type="button"
                name="burger-menu"
                css={navbarBurgerClass}
                onClick={() => this.toggleHamburger()}
              >
                <div css={navbarBurgerLineClass} />
                <div css={navbarBurgerLineClass} />
                <div css={navbarBurgerLineClass} />
              </button>
              <div
                css={css`
                  display: none;
                  margin: 0.5rem 0 0.25rem;
                  width: 100%;
                  text-align: center;
                  &.${activeClass} {
                    display: inline-block;
                  }
                `}
                className={navBarActiveClass}
              >
                <Link
                  css={navbarBurgerItemClass}
                  to="/about/"
                >
                  About
                </Link>
                <Link
                  css={navbarBurgerItemClass}
                  to="/blog/"
                >
                  Blog
                </Link>
              </div>
            </nav>
          ))}
        </Media>
      </div>
    )
  }
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar
