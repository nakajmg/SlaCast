import * as React from 'react'
import { map } from 'lodash'
import { PartialChannelResult } from '@slack/client'
import './ChannelList.scss'

const className = 'ChannelList'
function ChannelList({ channels, handleOnClickChannel }: any) {
  return (
    <div className={className}>
      {map(channels, ({ name, id }: PartialChannelResult) => (
        <div
          className={`${className}_Channel`}
          key={id}
          onClick={() => handleOnClickChannel(id)}
        >
          {name}
        </div>
      ))}
    </div>
  )
}

export default ChannelList
