let neutralArea = document.querySelector(".neutralArea");
let areas = { a: null, b: null, c: null };

//Functions

function dragStart(e) {
  e.currentTarget.classList.add("dragging");
}
function dragEnd(e) {
  e.currentTarget.classList.remove("dragging");
}

function updateAreas() {
  document.querySelectorAll(".area").forEach((area) => {
    let name = area.getAttribute("data-name");
    let item = area.querySelector(".item");
    if (item !== null) {
      areas[name] = item.innerHTML;
    } else {
      areas[name] = null;
    }
  });
  if (areas.a === "1" && areas.b === "2" && areas.c === "3") {
    document.querySelector(".areas").classList.add("correct");
  } else {
    document.querySelector(".areas").classList.remove("correct");
  }
}

function dragOver(e) {
  if (e.currentTarget.querySelector(".item") === null) {
    e.preventDefault();
    e.currentTarget.classList.add("hover");
  }
}

function dragLeave(e) {
  e.currentTarget.classList.remove("hover");
}

function drop(e) {
  let dragItem = document.querySelector(".item.dragging");
  e.currentTarget.classList.remove("hover");
  if (e.currentTarget.querySelector(".item") === null) {
    e.currentTarget.appendChild(dragItem);
    updateAreas();
  }
}

function dragOverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add("hover");
}

function dragLeaveNeutral(e) {
  e.currentTarget.classList.remove("hover");
}

function dropNeutral(e) {
  let dragItem = document.querySelector(".item.dragging");
  e.currentTarget.classList.remove("hover");
  e.currentTarget.appendChild(dragItem);
  updateAreas();
}

//Events
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

document.querySelectorAll(".area").forEach((area) => {
  area.addEventListener("dragover", dragOver);
  area.addEventListener("dragleave", dragLeave);
  area.addEventListener("drop", drop);
});

neutralArea.addEventListener("dragover", dragOverNeutral);
neutralArea.addEventListener("dragleave", dragLeaveNeutral);
neutralArea.addEventListener("drop", dropNeutral);
