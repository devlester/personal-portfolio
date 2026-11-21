"use strict";
const projects = {
  handheld: {
    number: "01",
    category: "INVENTORY · HANDHELD WORKFLOW",
    title: "From picklist to packed box.",
    intro:
      "A practical workflow built for a Windows CE / Mobile handheld device, with local data and CSV exchange between the device and a PC.",
    problem:
      "Picking needs accurate quantities, clear box assignments, and a way to move records between the floor and the office, even when the device is offline.",
    approach: [
      "Import a CSV picklist with style codes, barcodes, descriptions, quantities, locations, and store details.",
      "Find items by barcode or style code, enter a quantity, and save the pick when the box number is entered.",
      "Check quantities before saving to prevent over-picking and track scanned totals by box and overall.",
      "Export scanned results to the PC and prepare a picklist for printing, including incomplete lists.",
    ],
    outcome:
      "The workflow connects picking, quantity checks, and box tracking in one sequence, with a clear record to bring back to the office.",
    tools:
      "VB.NET · .NET Compact Framework · Windows CE / Mobile · Local database · CSV",
    link: true,
  },
  excel: {
    number: "02",
    category: "DATA & REPORTING · EXCEL WORKFLOWS",
    title: "Make the spreadsheet work harder.",
    intro:
      "Spreadsheet projects built around the recurring work of maintaining product catalogs, extracting order data, and preparing operational reports.",
    problem:
      "Product information often arrives in formats that are hard to filter or reuse: sizes across columns, descriptions mixed with color details, and product images stored separately.",
    approach: [
      "Restructure article codes, descriptions, sizes, and allocated quantities into one record per size.",
      "Extract and standardize product categories and colors for cleaner catalog data.",
      "Use VBA to place product images beside matching style codes, fit them to cells, and align them consistently.",
      "Work with CSV imports, lookup formulas, reconciliation, and structured tables to keep recurring reports organized.",
    ],
    outcome:
      "Consistent records make the next step easier: reviewing an order, checking a catalog, finding a mismatch, or preparing an upload.",
    tools: "Microsoft Excel · VBA · Google Sheets · CSV · Data cleanup",
  },
  inventory: {
    number: "03",
    category: "OPERATIONS SYSTEMS · STOCK & LOCATIONS",
    title: "Know what’s where.",
    intro:
      "Inventory and location workflows shaped by hands-on receiving, warehouse, and multi-store operations experience.",
    problem:
      "One product may sit in several locations, while stores need replenishment and the office needs accurate product and stock records.",
    approach: [
      "Maintain structured product records including style codes, barcodes, categories, descriptions, and pricing.",
      "Search by barcode or style code and display multiple locations with their quantities.",
      "Select an existing location to update its location code and quantity.",
      "Support reporting around receiving, replenishment, stock transfers, consignment, returns, and sales.",
    ],
    outcome:
      "The aim is a more usable stock record: easy to look up, easier to maintain, and connected to the work happening in stores and the warehouse.",
    tools: "PHP · PostgreSQL · Microsoft Access · VB.NET · Barcode workflows",
  },
};
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
let returnFocus = null;
function openProject(key, trigger) {
  const p = projects[key];
  if (!p) return;
  returnFocus = trigger;
  dialogContent.replaceChildren();
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = p.number + " / " + p.category;
  const title = document.createElement("h2");
  title.id = "dialog-title";
  title.textContent = p.title;
  const intro = document.createElement("p");
  intro.textContent = p.intro;
  dialogContent.append(eyebrow, title, intro);
  for (const [heading, body] of [
    ["The challenge", p.problem],
    ["The approach", p.approach],
    ["What this brings together", p.outcome],
  ]) {
    const h = document.createElement("h3");
    h.textContent = heading;
    dialogContent.append(h);
    if (Array.isArray(body)) {
      const ul = document.createElement("ul");
      body.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        ul.append(li);
      });
      dialogContent.append(ul);
    } else {
      const para = document.createElement("p");
      para.textContent = body;
      dialogContent.append(para);
    }
  }
  const tools = document.createElement("p");
  tools.className = "dialog-tools";
  tools.textContent = p.tools;
  dialogContent.append(tools);
  if (p.link) {
    const a = document.createElement("a");
    a.href = "#demo-title";
    a.className = "text-link";
    a.textContent = "Try the simplified example ↘";
    a.addEventListener("click", () => dialog.close());
    dialogContent.append(a);
  }
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("modal-open");
}
document
  .querySelectorAll("[data-project]")
  .forEach((b) =>
    b.addEventListener("click", () => openProject(b.dataset.project, b)),
  );
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  const r = dialog.getBoundingClientRect();
  if (
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  returnFocus?.focus({ preventScroll: true });
});
const form = document.querySelector("#pick-form");
const qty = document.querySelector("#qty");
const box = document.querySelector("#box");
const msg = document.querySelector("#demo-message");
let picked = 0;
let boxes = {};
function updateDemo() {
  document.querySelector("#progress-count").textContent = picked + " / 6 units";
  document.querySelector("#progress-bar").style.width =
    (picked / 6) * 100 + "%";
  document.querySelector("#remaining").textContent = 6 - picked;
  document.querySelector("#progress-text").textContent =
    picked === 6
      ? "Pick complete"
      : picked
        ? "Picking in progress"
        : "Ready to pick";
  qty.max = 6 - picked;
  qty.disabled = picked === 6;
  box.disabled = picked === 6;
  document.querySelector("#save-pick").disabled = picked === 6;
  const summary = document.querySelector("#box-summary");
  summary.replaceChildren();
  Object.entries(boxes).forEach(([n, count]) => {
    const item = document.createElement("span");
    item.textContent =
      "Box " +
      n.padStart(2, "0") +
      " · " +
      count +
      " " +
      (count === 1 ? "unit" : "units");
    summary.append(item);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const n = Number(qty.value);
  const remaining = 6 - picked;
  msg.classList.remove("error");
  if (!Number.isInteger(n) || n < 1 || n > remaining) {
    msg.textContent = "Enter a whole quantity between 1 and " + remaining + ".";
    msg.classList.add("error");
    qty.focus();
    return;
  }
  picked += n;
  boxes[box.value] = (boxes[box.value] || 0) + n;
  const boxLabel = box.value.padStart(2, "0");
  msg.textContent =
    picked === 6
      ? "All 6 units assigned. Every item has a box."
      : n +
        " " +
        (n === 1 ? "unit" : "units") +
        " saved to Box " +
        boxLabel +
        ". " +
        (6 - picked) +
        " remaining.";
  updateDemo();
  if (picked < 6) qty.value = Math.min(n, 6 - picked);
});
qty.addEventListener("invalid", () => {
  msg.classList.add("error");
  msg.textContent =
    picked === 6
      ? "This pick is complete. Reset the example to start again."
      : "Choose a whole quantity from 1 to " +
        (6 - picked) +
        ". Extra units cannot be picked.";
});
document.querySelector("#reset-demo").addEventListener("click", () => {
  picked = 0;
  boxes = {};
  updateDemo();
  qty.value = 2;
  box.value = 1;
  msg.classList.remove("error");
  msg.textContent =
    "Example reset. Choose a quantity and a box to get started.";
});
document.querySelector("#copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText("lesterlh.laynes@gmail.com");
    status.textContent = "Email address copied.";
  } catch {
    status.textContent =
      "Email: lesterlh.laynes@gmail.com — select the address above to copy it.";
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
