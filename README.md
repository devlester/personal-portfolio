# Lester Laynes — Operations, Organized.

Professional portfolio for administrative support, e-commerce operations, inventory workflows, and practical automation.

## Source and hosting

`index.html`, `style.css`, and `app.js` are the current site. The portrait, favicon, and original DOCX resume are local assets in the repository root. No build step or dependencies are required. Vercel serves this root directory using `vercel.json`. Production branch: `main`.

## Local preview

Run `python3 -m http.server 8000` from the repository and open `http://localhost:8000`.

## Features

- Responsive portfolio, professional portrait, experience and contact links
- Downloadable original CV
- Three accessible project-detail dialogs
- Sample pick-and-pack interaction with quantity validation, box totals, completion and reset
- Copy-email button, keyboard focus styles, and reduced-motion support

Project visuals are illustrative recreations. The picking example uses fictional data and does not show customer or business records.

## Validation

JavaScript syntax, asset references, anchor targets, and resume integrity were verified. Browser checks covered desktop and mobile layouts, dialogs, invalid quantities, box assignments, completion, reset, and email copying.

Earlier portfolio source under `src/` remains available in the repository; previous versions are retained in Git history.
