"use client"

import * as React from "react"
import { TooltipProps } from "recharts"
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

export type ChartConfig = Record<
  string,
  {
    label: string
    color?: string
    formatter?: (value: number) => string
  }
>

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div className={className} {...props}>
      <style>
        {Object.entries(config)
          .filter(([, value]) => value.color)
          .map(([key, value]) => {
            return `
              :root {
                --color-${key}: ${value.color};
              }
            `
          })
          .join("")}
      </style>
      {children}
    </div>
  )
}

// Define a more specific type for the payload item
interface PayloadItem {
  name: string
  value: number
  payload: {
    [key: string]: unknown
    fill?: string
  }
  color?: string
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: PayloadItem[]
  label?: string
  formatter?: (value: number) => string
  labelFormatter?: (label: string) => string
  hideLabel?: boolean
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  hideLabel = false,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="text-xs font-bold">
          {labelFormatter ? labelFormatter(label!) : label}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: item.payload?.fill || item.color,
              }}
            />
            <span className="font-medium">
              {item.name}:{" "}
              {formatter ? formatter(item.value) : item.value.toString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export type ChartTooltipProps = TooltipProps<ValueType, NameType> & {
  hideLabel?: boolean
}

export function ChartTooltip({
  content,
  ...props
}: ChartTooltipProps) {
  return <Tooltip content={content} {...props} />
}

// Borrow this from recharts since it's not exported
function Tooltip({
  content,
  cursor = true,
}: TooltipProps<ValueType, NameType>) {
  return (
    <React.Fragment>
      {cursor && (
        <div
          style={{
            pointerEvents: "none",
            opacity: 0.5,
            backgroundColor: "#ccc",
            position: "absolute",
          }}
        />
      )}
      {React.isValidElement(content) ? content : null}
    </React.Fragment>
  )
} 