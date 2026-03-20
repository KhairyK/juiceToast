import { useEffect, useState } from "react"
import { toast } from "./JuiceToast"

export function useToast(){

  const [mounted,setMounted] = useState(false)

  useEffect(()=>{
    setMounted(true)
  },[])

  if(!mounted){
    return new Proxy({},{
      get:()=>()=>{}
    })
  }

  return toast
}