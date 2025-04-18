
import { ThemeProvider } from "./theme/ThemeContext";
import { Header } from "./components/Header";
import { ResumeEditor } from "./components/ResumeEditor";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 font-sans">
        <Header />
        <ResumeEditor />
      </div>
    </ThemeProvider>
  );
}

export default App;