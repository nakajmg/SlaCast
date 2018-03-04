import * as React from 'react'
import './ChannelFilter.scss'

const className = 'ChannelFilter'
function ChannelFilter({
  handleOnInputFilter,
  handleOnKeyUp,
  filterValue,
}: any) {
  return (
    <div className={className}>
      <input
        className={`${className}_Input`}
        type="text"
        value={filterValue}
        onInput={e => handleOnInputFilter(e)}
        autoFocus
        onKeyUp={e => handleOnKeyUp(e)}
      />
      <span className={`${className}_SearchIcon`}>🔍</span>
      <div className={`${className}_ClearButton`}>x</div>
    </div>
  )
}

export default ChannelFilter
