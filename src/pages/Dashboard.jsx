function Dashboard({ pages }) {

  const totalPages = pages.length;

  let totalTasks = 0;
  let completedTasks = 0;

  pages.forEach((page) => {
    page.blocks.forEach((block) => {
      if (block.type === "checkbox") {
        totalTasks++;
        if (block.checked) completedTasks++;
      }
    });
  });

  return (
    <div className="p-4">

      <h3 className="mb-4">Dashboard</h3>

      <div className="row">

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Total Pages</h6>
            <h3>{totalPages}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Total Tasks</h6>
            <h3>{totalTasks}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>Completed Tasks</h6>
            <h3>{completedTasks}</h3>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;