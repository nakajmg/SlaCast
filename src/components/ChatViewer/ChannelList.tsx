import * as React from 'react'
import { map } from 'lodash'
import { PartialChannelResult } from '@slack/client'

function ChannelList({ channels, handleOnClickChannel }: any) {
  return (
    <div>
      {map(channels, ({ name, id }: PartialChannelResult) => (
        <div key={id} onClick={() => handleOnClickChannel(id)}>
          {name}:({id})
        </div>
      ))}
    </div>
  )
}

export default ChannelList
