import React from 'react';
import { useToast } from '../index';

export default function App() {

  const toast = useToast()

  const save = () => {
    toast.info("saving the data...")

    setTimeout(() => {
      toast.success("Data Saved!")
    }, 2000)
  }

  return (
    <button onClick={save}>
      Save
    </button>
  )
}
