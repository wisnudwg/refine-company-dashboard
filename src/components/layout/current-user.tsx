import { Button, Popover } from "antd"
import React from "react"
import CustomAvatar from "../custom-avatar"
import { useGetIdentity } from "@refinedev/core"

// import type { User } from "@/graphql/schema.types"

// placeholder for future type from graphql
type User = {
  name?: string;
}

const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar name={user?.name} />
      </Popover>
    </>
  )
}

export default CurrentUser