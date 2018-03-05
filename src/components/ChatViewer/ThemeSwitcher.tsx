import * as React from 'react'
import './ThemeSwitcher.scss'
const className = 'ThemeSwitcher'
function ThemeSwitcher({ theme, handleToggleTheme }: any) {
  return <div onClick={handleToggleTheme} className={`${className} ${theme}`} />
}

export default ThemeSwitcher
