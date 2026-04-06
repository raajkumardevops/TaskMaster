function Sidebar({ pages, setPages, setCurrentPageId, currentPageId }) {

  // ➕ Add Page
  const addPage = () => {
    const newPage = {
      id: Date.now().toString(),
      title: "New Page",
      blocks: []
    };

    const updated = [...pages, newPage];

    setPages(updated);
    setCurrentPageId(newPage.id);

    localStorage.setItem("taskmaster", JSON.stringify({ pages: updated }));
  };

  // ❌ Delete Page
  const deletePage = (pageId) => {
    const updated = pages.filter((p) => p.id !== pageId);

    setPages(updated);

    // If current page deleted → switch to another
    if (currentPageId === pageId) {
      setCurrentPageId(updated.length > 0 ? updated[0].id : null);
    }

    localStorage.setItem("taskmaster", JSON.stringify({ pages: updated }));
  };

  return (
    <div
      className="bg-white p-3 border-end shadow-sm"
      style={{ width: "250px", height: "100vh" }}
    >
      {/* 🧠 App Title */}
      <h5 className="mb-3 fw-bold">TaskMaster</h5>

      {/* 📊 Dashboard Button */}
      <div
        onClick={() => setCurrentPageId("dashboard")}
        className={`p-2 rounded mb-2 ${
          currentPageId === "dashboard"
            ? "bg-dark text-white"
            : "bg-light"
        }`}
        style={{ cursor: "pointer" }}
      >
        📊 Dashboard
      </div>

      {/* ➕ Add Page */}
      <button
        className="btn btn-primary btn-sm w-100 mb-3"
        onClick={addPage}
      >
        + New Page
      </button>

      {/* 📁 Pages List */}
      <div>
        {pages.length === 0 && (
          <p className="text-muted small">No pages yet</p>
        )}

        {pages.map((p) => (
          <div
            key={p.id}
            className={`d-flex justify-content-between align-items-center p-2 rounded mb-2 ${
              currentPageId === p.id
                ? "bg-primary text-white"
                : "bg-light"
            }`}
            style={{ cursor: "pointer", transition: "0.2s" }}
          >
            {/* Page Name */}
            <span
              onClick={() => setCurrentPageId(p.id)}
              style={{ flexGrow: 1 }}
            >
              {p.title}
            </span>

            {/* ❌ Delete Button */}
            <button
              className="btn btn-sm btn-danger ms-2"
              onClick={(e) => {
                e.stopPropagation(); // prevent switching page
                deletePage(p.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;