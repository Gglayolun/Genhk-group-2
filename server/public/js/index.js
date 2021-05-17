const taskArea = document.querySelector(".card-area")

window.onload = () => {
    fetchAndDisplayMemos()
}

async function fetchAndDisplayMemos() {
    const res = await fetch("http://localhost:8080/todolist");
    const dataArr = await res.json();

    let htmlStr = ``;
    for (const task of dataArr) {
        htmlStr += `
        <div class="card ${task.id}">
        <div class="card-head ">
            <h1>${task.name}</h1>
            <div class="dropdown ">
                <a class="btn " type="button " id="dropdownMenuButton1 " data-bs-toggle="dropdown " aria-expanded="false ">
                    <i class="fas fa-ellipsis-h "></i>
                </a>
                <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1 ">
                  <li>
                      <button type="button " class="btn dropdown-item " data-bs-toggle="modal " data-bs-target="#exampleModal " data-bs-whatever="@mdo ">
                        Edit
                    </button>
                    <div class="modal fade " id="exampleModal " tabindex="-1 " aria-labelledby="exampleModalLabel " aria-hidden="true ">
                        <div class="modal-dialog ">
                          <div class="modal-content ">
                            <div class="modal-header ">
                              <h5 class="modal-title " id="exampleModalLabel ">Edit Tsk</h5>
                              <button type="button " class="btn-close " data-bs-dismiss="modal " aria-label="Close "></button>
                            </div>
                            <div class="modal-body ">
                              <form>
                                <div class="mb-3 ">
                                  <label for="edit-title " class="col-form-label ">Title:</label>
                                  <input type="text " class="form-control " id="edit-title ">
                                </div>
                                <div class="mb-3 ">
                                  <label for="edit-context " class="col-form-label ">Context:</label>
                                  <textarea type="text " class="form-control " id="edit-context "></textarea>
                                </div>
                                <div class="mb-3 ">
                                    <label for="edit-status " class="col-form-label ">Status:</label>
                                    <input type="text " class="form-control " id="edit-status "></input>
                                  </div>
                                  <div class="mb-3 ">
                                    <label for="edit-due-date " class="col-form-label ">Due date:</label>
                                    <input type="date " class="form-control " id="edit-due-date "></input>
                                  </div>
                                  <div class="mb-3 ">
                                    <label for="edit-assigntowho " class="col-form-label ">Assign to:</label>
                                    <input type="text " form-control" id="edit-assigntowho"></input>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
        </li>
        <li><a class="dropdown-item" href="#">Delete</a></li>
        </ul>
    </div>
    </div>
        <div class="card-body">
        <p>${task.description}</p>
    </div>
    <div class="card-foot">
            <select>
                <option>To-do</option>
                <option>On-going</option>
                <option>Document</option>
            </select>
        <h5>${task.duedate}</h5>
        <div class="assignto">${task.assignedto}</div>
        <div class="delete ">${task.delete}<i class="fas fa-trash "></i></div>
    </div>
    </div>
        `;
    }
    taskArea.innerHTML = htmlStr;
}


async function deleteMemo() {
    const res = await fetch(`/index/${task.delete}`, {
        method: "DELETE",
    });
    if (res.status === 200) {
        fetchAndDisplayMemos();
    }
    if (res.status === 400) {
        const data = await res.json();
        alert(data.message);
    }
}
async function editMemo(memoID) {
    const content = document.getElementById(`content-${task.id}`).value;
    const res = await fetch(`/memos/${task.id},${task.assignedto},${task.description},${task.duedate}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ content }),
    });
    if (res.status === 200) {
        fetchAndDisplayMemos();
    }
}