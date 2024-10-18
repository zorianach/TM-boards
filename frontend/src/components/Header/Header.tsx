import React from 'react'
import css from './Header.module.css'

const Header = () => {
  return (
    <header className={css.header}>
          <div className={css.header_container}>
            <img src="/tm_icon.jpg" alt="Checkbox" width="80" height="80"/>
            <h1 className={css.home_title}>Task Management Boards</h1>
          </div>
      </header>
  )
}

export default Header