import { JSX, ComponentChildren, createContext } from 'preact'
import { useRef, useMemo, useContext } from 'preact/hooks'
import { toArray } from '../lib/util.js'

type HeadProps = {
  children: ComponentChildren
}

export default function Head({ children }: HeadProps): null {
  const context = useContext(HeadContext)
  context.append(children)
  return null
}

type HeadProviderProps = {
  children?: ComponentChildren
  tags: ComponentChildren[][]
}

export function HeadProvider({ children, tags }: HeadProviderProps): JSX.Element {

  const tagsRef = useRef<ComponentChildren[][]>(tags)

  const value = useMemo(() => ({
    append: (elements: ComponentChildren): number => {
      return tagsRef.current.push(toArray(elements))
    },
    children: tagsRef.current
  }), [])

  return (
    <HeadContext.Provider value={value}>
      { children }
    </HeadContext.Provider>
  )
}

export const HeadContext = createContext({
  append: (elements: ComponentChildren): number => -Infinity,
  children: null as ComponentChildren
})
