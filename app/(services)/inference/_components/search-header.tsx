"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { useStore } from "@/store/store"
import { Field } from "@components/field"
import { Input } from "@components/input"
import { Popover, PopoverContent, PopoverTrigger } from "@components/popover"
import { Slider } from "@components/slider"
import { Text } from "@components/text"
import { MinusCircle, PlusCircle, Settings } from "lucide-react"
import { useSession } from "next-auth/react"
import { Inference } from "outpostkit"

import { useToast } from "@/components/ui/use-toast"

import { GlobalInference } from "./search"

export function SearchHeader(props: {
  deleteTab: () => void
  addTab: () => void
  configValues: {
    max_tokens: any
    temperature: any
    top_p: any
    frequency_penalty: any
    presence_penalty: any
    stream: any
  }
  setConfigValues: any
  globalInference: GlobalInference
  setGlobalInference: Dispatch<SetStateAction<GlobalInference>>
}) {
  const { toast } = useToast()

  const session = useSession()
  const [value, setValue] = useState("")
  return (
    <div className="flex items-center gap-2 border-b p-2">
      <Input
        onChange={(e) => {
          setValue(e.target.value)
        }}
        value={value}
        onBlur={async () => {
          if (!value.trim()) return
          toast({ title: "Config updated!" })
          const infer = new Inference(
            session?.data?.user?.accessToken as string,
            value as string
          )
          const details = await infer.getInferenceInfo()
          console.log(details)
          props.setGlobalInference({
            infer: infer,
            details: {
              model: details.model,
              domain: `https://` + details.domains[0].name,
              entrypointType: details.vllmConfig.entrypointType as
                | "openai"
                | "generic",
            },
          })
        }}
        placeholder="Id"
      />
      <button
        onClick={() => {
          props.deleteTab()
        }}
        className="block"
      >
        <MinusCircle className="h-4 shrink-0 text-soft" />
      </button>
      <button
        onClick={() => {
          props.addTab()
        }}
        className="block"
      >
        <PlusCircle className="h-4 shrink-0 text-soft" />
      </button>

      {/* configs */}

      <Popover>
        <PopoverTrigger asChild>
          <button className=" block">
            <Settings className="h-4 text-soft" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="left"
          align="start"
          className="flex flex-col gap-5"
        >
          <Field
            htmlFor="max_tokens"
            label={
              <RangeHeader
                title="Max Tokens"
                value={props.configValues.max_tokens}
              />
            }
          >
            <Slider
              min={1}
              max={1024}
              value={[props.configValues.max_tokens]}
              onValueChange={(v) => {
                // @ts-ignore

                props.setConfigValues((prev) => ({ ...prev, max_tokens: v }))
              }}
            />
          </Field>
          <Field
            htmlFor="temperature"
            label={
              <RangeHeader
                title="Temperature"
                value={props.configValues.temperature}
              />
            }
          >
            <Slider
              step={0.01}
              min={0.0}
              max={2}
              value={[props.configValues.temperature]}
              onValueChange={(v) => {
                // @ts-ignore

                props.setConfigValues((prev) => ({ ...prev, temperature: v }))
              }}
            />
          </Field>
          <Field
            htmlFor="top_p"
            label={
              <RangeHeader title="Top P" value={props.configValues.top_p} />
            }
          >
            <Slider
              min={0}
              max={1.0}
              step={0.01}
              value={[props.configValues.top_p]}
              onValueChange={(v) => {
                // @ts-ignore
                props.setConfigValues((prev) => ({ ...prev, top_p: v }))
              }}
            />
          </Field>

          <Field
            htmlFor="frequency_penalty"
            label={
              <RangeHeader
                title="Frequency Penalty"
                value={props.configValues.frequency_penalty}
              />
            }
          >
            <Slider
              min={-2.0}
              max={2.0}
              step={0.1}
              value={[props.configValues.frequency_penalty]}
              onValueChange={(v) => {
                // @ts-ignore

                props.setConfigValues((prev) => ({
                  ...prev,
                  frequency_penalty: v,
                }))
              }}
            />
          </Field>
          <Field
            htmlFor="presence_penalty"
            label={
              <RangeHeader
                title="Presence Penalty"
                value={props.configValues.presence_penalty}
              />
            }
          >
            <Slider
              min={-2.0}
              step={0.1}
              max={2.0}
              value={[props.configValues.presence_penalty]}
              onValueChange={(v) => {
                // @ts-ignore

                props.setConfigValues((prev) => ({
                  ...prev,
                  presence_penalty: v,
                }))
              }}
            />
          </Field>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function RangeHeader(props: { title: string; value: any }) {
  return (
    <div className="flex items-center justify-between">
      <Text variant="bodySm">{props.title}</Text>
      <Text variant="bodySm">{props.value}</Text>
    </div>
  )
}
