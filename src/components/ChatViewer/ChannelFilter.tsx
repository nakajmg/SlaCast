import * as React from 'react'

function ChannelFilter({ handleOnInputFilter }: any) {
  return (
    <div>
      <input type="text" onInput={e => handleOnInputFilter(e)} />
    </div>
  )
}

export default ChannelFilter
