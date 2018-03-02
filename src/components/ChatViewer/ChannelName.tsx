import * as React from 'react'

function ChannelName({ currentChannelName }: any) {
  return (
    <div>#{currentChannelName ? currentChannelName : 'choose channel'}</div>
  )
}

export default ChannelName
