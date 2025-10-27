"use client"

import {
  Toaster as ChakraToaster,
  Portal,
  createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster />
    </Portal>
  )
}