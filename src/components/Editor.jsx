import { useMemo } from "react";

function Editor({ pages, setPages, currentPageId }) {

  // 🔍 Get current page
  const page = useMemo(() => {
    return pages.find((p) => p.id === currentPageId);
  }, [pages, currentPageId]);

  // 💾 Save updated page
  const savePage = (updatedPage) => {
    const updatedPages = pages.map((p) =>
      p.id === updatedPage.id ? updatedPage : p
    );

    setPages(updatedPages);
    localStorage.setItem("taskmaster", JSON.stringify({ pages: updatedPages }));
  };

  // ➕ Add new block
  const addBlock = (type) => {
    if (!page) return;

    const newBlock = {
      id: Date.now().toString(),
      type,
      content: "",
      checked: false
    };

    const updatedPage = {
      ...page,
      blocks: [...page.blocks, newBlock]
    };

    savePage(updatedPage);
  };

  // ❌ Delete block
  const deleteBlock = (blockId) => {
    const updatedBlocks = page.blocks.filter((b) => b.id !== blockId);
    savePage({ ...page, blocks: updatedBlocks });
  };

  // ❌ No page selected
  if (!page) return <div className="p-4">No Page Selected</div>;

  return (
    <div className="p-4 flex-grow-1">

      {/* ✏️ Editable Page Title */}
      <input
        className="form-control mb-3 fw-bold"
        value={page.title}
        onChange={(e) => {
          savePage({ ...page, title: e.target.value });
        }}
      />

      {/* ⚡ Slash Command Input (FIXED POSITION) */}
      <input
        className="form-control mb-3"
        placeholder="Type /text or /checkbox"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.target.value === "/text") {
              addBlock("text");
            } else if (e.target.value === "/checkbox") {
              addBlock("checkbox");
            }
            e.target.value = "";
          }
        }}
      />

      {/* ➕ Buttons (Optional quick add) */}
      <div className="mb-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => addBlock("text")}
        >
          + Text
        </button>

        <button
          className="btn btn-outline-success"
          onClick={() => addBlock("checkbox")}
        >
          + Checkbox
        </button>
      </div>

      {/* 🧱 Blocks */}
      <div className="mt-4">
        {page.blocks.map((block) => (
          <div
            key={block.id}
            className="mb-3 d-flex align-items-start gap-2"
          >

            {/* ❌ Delete Button */}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteBlock(block.id)}
            >
              ×
            </button>

            <div className="flex-grow-1">

              {/* 📝 TEXT BLOCK */}
              {block.type === "text" && (
                <input
                  className="form-control"
                  placeholder="Write something..."
                  value={block.content}
                  onChange={(e) => {
                    const updatedBlocks = page.blocks.map((b) =>
                      b.id === block.id
                        ? { ...b, content: e.target.value }
                        : b
                    );

                    savePage({ ...page, blocks: updatedBlocks });
                  }}
                />
              )}

              {/* ✅ CHECKBOX BLOCK */}
              {block.type === "checkbox" && (
                <div className="form-check">

                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={block.checked}
                    onChange={(e) => {
                      const updatedBlocks = page.blocks.map((b) =>
                        b.id === block.id
                          ? { ...b, checked: e.target.checked }
                          : b
                      );

                      savePage({ ...page, blocks: updatedBlocks });
                    }}
                  />

                  <input
                    className="form-control mt-1"
                    placeholder="Checkbox text..."
                    value={block.content}
                    onChange={(e) => {
                      const updatedBlocks = page.blocks.map((b) =>
                        b.id === block.id
                          ? { ...b, content: e.target.value }
                          : b
                      );

                      savePage({ ...page, blocks: updatedBlocks });
                    }}
                  />
                </div>
              )}

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Editor;