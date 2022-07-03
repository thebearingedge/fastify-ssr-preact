import { useRef, useEffect } from 'preact/hooks'

export default function useIsMounted(): () => boolean {

  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => { isMountedRef.current = false }
  }, [])

  return () => isMountedRef.current
}
