# Lester Laynes — Operations, Organized.

Professional portfolio for administrative support, e-commerce operations, inventory workflows, and practical automation.

**Live site:** https://lester-personal-portfolio.vercel.app/

## Source and hosting

`index.html`, `style.css`, and `app.js` are the current site. The portrait, social preview image (`og-image.jpg`), favicon, and resume (PDF, plus the original DOCX) are local assets in the repository root. No build step or dependencies are required. Vercel serves this root directory using `vercel.json`. Production branch: `main`.

## Local preview

Run `python3 -m http.server 8000` from the repository and open `http://localhost:8000`.

## Features

- Responsive portfolio, professional portrait, experience and contact links
- Downloadable CV (PDF and Word)
- Three accessible project-detail dialogs
- Sample pick-and-pack interaction with quantity validation, box totals, completion and reset
- Copy-email button, keyboard focus styles, and reduced-motion support

Project visuals are illustrative recreations. The picking example uses fictional data and does not show customer or business records.

## Validation

JavaScript syntax, asset references, anchor targets, and resume integrity were verified. Browser checks covered desktop and mobile layouts, dialogs, invalid quantities, box assignments, completion, reset, and email copying.

