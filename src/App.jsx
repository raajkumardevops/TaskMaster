import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Dashboard from "./pages/Dashboard";

function App() {
  const [pages, setPages] = useState([]);
  const [currentPageId, setCurrentPageId] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("taskmaster")) || { pages: [] };
    setPages(data.pages);

    if (data.pages.length > 0) {
      setCurrentPageId(data.pages[0].id);
    }
  }, []);

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar
        pages={pages}
        setPages={setPages}
        setCurrentPageId={setCurrentPageId}
        currentPageId={currentPageId}
      />
      <Editor
        pages={pages}
        setPages={setPages}
        currentPageId={currentPageId}
      />

      {currentPageId === "dashboard" && (
      <Dashboard pages={pages} />
)}
    </div>
  );
}

export default App;