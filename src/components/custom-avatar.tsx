import React from 'react'
import { Avatar as AntdAvatar, AvatarProps } from 'antd'

type Props = AvatarProps & {
  name?: string;
}

const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={'Javascript Mastery'}
      size="small"
      style={{
        backgroundColor: '#87D068',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        ...style
      }}
      {...rest}
    >
      {name ? name.split(' ').map((item) => item[0]).join("") : "N/A"}
    </AntdAvatar>
  )
}

export default CustomAvatar