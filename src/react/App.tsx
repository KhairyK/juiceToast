import { JuiceToastProvider, useJuiceToast } from "./index";

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

export default function App() {
  return (
    <JuiceToastProvider theme="glass">
      <Demo />
    </JuiceToastProvider>
  );
}