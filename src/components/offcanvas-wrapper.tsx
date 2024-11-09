"use client"

import { useState } from "react"
import OffcanvasHeader from "./offcanvas-header"
import Sidebar from "./sidebar"

export default function OffcanvasWrapper() {
  const [isSidebarActive, setIsSidebarActive] = useState(false)

  function toggleSidebar() {
    setIsSidebarActive(!isSidebarActive)
  }
  return (
    <>
      <OffcanvasHeader
        toggle={toggleSidebar}
        isSidebarActive={isSidebarActive}
      />
      <Sidebar isSidebarActive={isSidebarActive} toggle={toggleSidebar} />
    </>
  )
}
