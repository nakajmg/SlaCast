import * as React from 'react'
import './ChannelName.scss'

const className = 'ChannelName'
function ChannelName({ currentChannelName, handleOnClick }: any) {
  return (
    <div className={className} onClick={handleOnClick}>
      # {currentChannelName ? currentChannelName : 'choose channel'}
    </div>
  )
}

export default ChannelName
