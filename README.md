# Quinlan Hoang — Portfolio

A zero-dependency, zero-build portfolio site. Plain HTML/CSS/JS — no npm, no
framework, nothing to install or break. All content lives in **one data file**,
so adding a project never touches HTML.

## Preview locally

Double-click `index.html` (or in VS Code: right-click → *Open with Live Server*
if you have that extension). That's it — there is no build step.

## Adding a project (the only thing you'll do regularly)

Open [`projects.js`](projects.js). Copy the template block from the comment at
the top, paste it into the `PROJECTS` array, and fill it in:

```js
{
  name: "MyNewProject",
  tagline: "One line: what it does and why it matters.",
  description: "2–3 sentences. Problem → what you built → results.",
  tags: ["Python", "React"],
  status: "Active",            // Active | Completed | In Development
  featured: false,             // true = full-width card at the top
  links: {
    github: "https://github.com/quinlan-dev/MyNewProject",
    demo: "",                  // "" hides the link
    writeup: ""
  },
  highlights: [
    "Quantified achievement, e.g. 'Handles 10k requests/day'",
    "Second bullet"
  ]
},
```

Save, refresh the browser. Once you have more than 3 projects, tag-filter
chips appear automatically.

Your name, pitch, skills, and contact links are in the `SITE` object at the
bottom of the same file. **Do:** edit the placeholder descriptions for
AFKapply and NodeSense with real details. To add a resume, drop `resume.pdf`
next to `index.html` and set `resume: "resume.pdf"` in `SITE`.

## Launching publicly — 100% free (GitHub Pages)

1. Create a **public** repo on GitHub named exactly `quinlan-dev.github.io`
   (using your username as the name gives you the clean root URL).
2. From this folder, run:
   ```
   git remote add origin https://github.com/quinlan-dev/quinlan-dev.github.io.git
   git add .
   git commit -m "Launch portfolio"
   git push -u origin main
   ```
   (If this folder's git remote is already set to a different repo, use
   `git remote set-url origin ...` instead of `add`.)
3. On GitHub: repo → **Settings → Pages** → Source: *Deploy from a branch* →
   Branch: `main`, folder `/ (root)` → Save.
4. In ~1 minute your site is live at **https://quinlan-dev.github.io**.

**Updating the live site** = commit + push. Nothing else:

```
git add . ; git commit -m "Add project X" ; git push
```

### Free alternatives (also zero-cost, drag-and-drop)

- **Netlify** (netlify.com) — drag this folder onto the dashboard, done.
- **Cloudflare Pages** / **Vercel** — connect the GitHub repo, auto-deploys
  on every push.

All of these are free forever for static sites like this one. A custom domain
(e.g. `quinlanhoang.dev`, ~$10/yr) is the only thing that ever costs money,
and it's optional — all four hosts let you attach one for free.

## Recruiter checklist (what makes this land)

- [ ] Replace the placeholder AFKapply/NodeSense descriptions with real details
- [ ] Quantify highlights wherever possible (numbers get read)
- [ ] Add live demo links — a clickable demo beats any description
- [ ] Add `resume.pdf` and your LinkedIn URL in `SITE`
- [ ] Pin AFKapply and NodeSense on your GitHub profile and give each repo a
      good README with a screenshot/GIF — recruiters click through
- [ ] Put the portfolio URL in your resume header and LinkedIn profile

## File map

| File | Purpose |
|---|---|
| `projects.js` | **All content** — projects + site config. The only file you edit. |
| `index.html` | Page skeleton |
| `styles.css` | Design (accent color = `--accent` variable at the top) |
| `script.js` | Renders content from `projects.js` |
