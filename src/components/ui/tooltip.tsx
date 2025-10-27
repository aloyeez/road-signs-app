import {
  TooltipRoot,
  TooltipTrigger as ChakraTooltipTrigger,
  TooltipContent as ChakraTooltipContent,
  TooltipArrow as ChakraTooltipArrow,
  TooltipArrowTip,
  TooltipPositioner as ChakraTooltipPositioner,
  Portal,
} from "@chakra-ui/react"
import * as React from "react"

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<React.ComponentProps<typeof ChakraTooltipTrigger>>
>(function TooltipTriggerWithChildren(props, ref) {
  return <ChakraTooltipTrigger ref={ref} {...props} />
})

const TooltipPositioner = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.ComponentProps<typeof ChakraTooltipPositioner>>
>(function TooltipPositionerWithChildren(props, ref) {
  return <ChakraTooltipPositioner ref={ref} {...props} />
})

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.ComponentProps<typeof ChakraTooltipContent>>
>(function TooltipContentWithChildren(props, ref) {
  return <ChakraTooltipContent ref={ref} {...props} />
})

const TooltipArrow = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.ComponentProps<typeof ChakraTooltipArrow>>
>(function TooltipArrowWithChildren(props, ref) {
  return <ChakraTooltipArrow ref={ref} {...props} />
})

export interface TooltipProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
  content: React.ReactNode
  contentProps?: React.ComponentProps<typeof TooltipContent>
  disabled?: boolean
  children: React.ReactNode
  rootProps?: React.ComponentProps<typeof TooltipRoot>
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow = true,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      portalRef,
      rootProps,
    } = props

    if (disabled) return <>{children}</>

    return (
      <TooltipRoot {...rootProps}>
        {/* ✅ Safe: TooltipTrigger requires a focusable element */}
        <TooltipTrigger>
          <span role="button" tabIndex={0}>
            {children}
          </span>
        </TooltipTrigger>

        <Portal disabled={!portalled} container={portalRef?.current ?? undefined}>
          <TooltipPositioner>
            <TooltipContent ref={ref} {...contentProps}>
              {showArrow && (
                <TooltipArrow>
                  <TooltipArrowTip />
                </TooltipArrow>
              )}
              {content}
            </TooltipContent>
          </TooltipPositioner>
        </Portal>
      </TooltipRoot>
    )
  },
)
