import { useEffect } from "react"
import juiceToast from "../core/juicetoast"

export default function JuiceToast(props) {

  useEffect(() => {
    const id = juiceToast[props.type || "info"]({
      title: props.title,
      message: props.message,
      ...props
    })

    return () => {
      if (props.cleanup !== false) {
        juiceToast.remove(id)
      }
    }

  }, [])

  return null
}