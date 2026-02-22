import { JuiceToastProvider, useJuiceToast } from "./index";
import React from 'react'
import ReactDOM from 'react-dom'

function Demo() {
  const toast = useJuiceToast();

  return (
    <>
      <button onClick={() => toast.success("Saved!")}>
        Success
      </button>
    </>
  );
}

function App() {
  return (
    <JuiceToastProvider theme="glass">
      <Demo />
    </JuiceToastProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
