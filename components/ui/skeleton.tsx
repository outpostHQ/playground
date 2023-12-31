import { ComponentPropsWithoutRef, ElementType, HTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

type Props<C extends ElementType> = { as?: C } & ComponentPropsWithoutRef<C>

function Skeleton<C extends ElementType>({
  className,
  as,
  ...props
}: Props<C>) {
  const Comp = as || "div"

  return (
    <Comp
      className={cn("animate-pulse rounded-lg bg-pressed ", className)}
      {...props}
    />
  )
}

export { Skeleton }

function Components() {
  return <Skeleton />
}
