import * as React from 'react'
import ChannelName from './ChannelName'
import ChannelFilter from './ChannelFilter'
import ChannelList from './ChannelList'

function ChatViewer({
  currentChannelName,
  channels,
  handleOnClickChannel,
  handleOnInputFilter,
}: any) {
  return (
    <div>
      <ChannelName currentChannelName={currentChannelName} />
      <ChannelFilter handleOnInputFilter={handleOnInputFilter} />
      <ChannelList
        channels={channels}
        handleOnClickChannel={handleOnClickChannel}
      />
    </div>
  )
}

export default ChatViewer
