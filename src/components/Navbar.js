import React from 'react'
import Media from 'react-media';
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import onigiriLog from '@images/onigiri.png'
import { rhythm } from '@utils/typography'

import PropTypes from 'prop-types';

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
      },
      () => {
        this.setState({
          navBarActiveClass:
            active ? 'is-active' : '',
        })
      },
    )
  }

  render() {
    const { title } = this.props
    const { navBarActiveClass } = this.state
    return (
      <div>
        <Link
          to="/"
          css={css`
              position: relative;
            `}
        >
          <h3
            css={css`
            display: inline;
            padding-left: ${rhythm(0.2)};
          `}
          >
            { title }
          </h3>
          <img
            css={css`
            position: relative;
            bottom: -${rhythm(0.2)};
            width: ${rhythm(1.1)};
            height: ${rhythm(1.1)};
            margin: 0 ${rhythm(0.2)};
          `}
            src={onigiriLog}
            alt="Logo"
          />
        </Link>
        <Media query="(min-width: 599px)">
          {matches => (matches ? (
            <nav css={css`
                display: inline-block;
                float: right;
                margin: ${rhythm(0.25)};
              `}
            >
              <Link
                to="/about/"
                css={css`
                  margin-left: ${rhythm(1)};
                  font-size: 1.5rem;
                `}
              >
                About
              </Link>
              <Link
                to="/"
                css={css`
                  margin-left: ${rhythm(1)};
                  font-size: 1.5rem;
                `}
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
                className="navbar-burger"
                onClick={() => this.toggleHamburger()}
              >
                <div />
                <div />
                <div />
              </button>
              <div className={`navbar-menu ${navBarActiveClass}`}>
                <Link
                  className="navbar-menu-item"
                  to="/about/"
                >
                  About
                </Link>
                <Link
                  className="navbar-menu-item"
                  to="/"
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
