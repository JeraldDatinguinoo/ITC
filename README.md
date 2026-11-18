# ☕ Kape-ling Cafe

<div align="center">

  <img src="logo/913414567_2117884672179343_2522890302276756562_n.jpg" alt="Kape-ling Cafe logo" width="150">

  ### Where Friendship Brews, One Cup at a Time.

  A warm, neighborhood-inspired cafe website celebrating coffee, merienda, and good company in Batangas City.

  <br>

  [![Visit Website](https://img.shields.io/badge/Visit%20Website-kape--ling--cafe.vercel.app-38251D?style=for-the-badge&logo=vercel&logoColor=white)](https://kape-ling-cafe.vercel.app/)
  [![HTML](https://img.shields.io/badge/HTML-Website-E76F3C?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS](https://img.shields.io/badge/CSS-Styling-75665B?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

</div>

---

## About the Project

**Kape-ling Cafe** is a simple multi-page website made to introduce a cafe concept. Visitors can explore the cafe's story, browse its menu, read about its community space, and find its contact information.

The design takes inspiration from a cozy local coffee shop. It uses warm colors, classic typography, and a clean layout to make the pages feel welcoming and easy to browse.

## Website Pages

| Page | What You'll Find |
|---|---|
| **Home** | Welcome section, featured drinks, and a quick look at the cafe. |
| **About** | The story, inspiration, and personality behind Kape-ling Cafe. |
| **Menu** | Coffee, cold drinks, non-coffee drinks, and merienda selections. |
| **Community** | A place for study breaks, meetups, and time with friends. |
| **Contact** | Location details, opening hours, and contact information. |

## Design Guide

The website follows a warm coffee-inspired color palette.

| Color | Hex Code | Use |
|---|---|---|
| <span style="display:inline-block;width:14px;height:14px;background:#FAF6F0;border:1px solid #ddd;"></span> Paper Cream | `#FAF6F0` | Main background |
| <span style="display:inline-block;width:14px;height:14px;background:#EEE4D7;border:1px solid #ddd;"></span> Light Cream | `#EEE4D7` | Secondary backgrounds |
| <span style="display:inline-block;width:14px;height:14px;background:#38251D;"></span> Espresso | `#38251D` | Header and dark sections |
| <span style="display:inline-block;width:14px;height:14px;background:#1E1815;"></span> Deep Ink | `#1E1815` | Main text |
| <span style="display:inline-block;width:14px;height:14px;background:#A64F35;"></span> Terracotta | `#A64F35` | Accent color |
| <span style="display:inline-block;width:14px;height:14px;background:#B18A4B;"></span> Brass Gold | `#B18A4B` | Small highlights |
| <span style="display:inline-block;width:14px;height:14px;background:#75665B;"></span> Muted Brown | `#75665B` | Secondary text |
| <span style="display:inline-block;width:14px;height:14px;background:#D8CBBD;"></span> Warm Beige | `#D8CBBD` | Borders and dividers |

**Fonts used**
- **Georgia** — headings and editorial text.
- **Arial** — body text, navigation, and buttons.
- **Courier New** — small labels and decorative details.

## Features

- CSS-based page styling and responsive layouts for desktop and mobile.
- A visual-only log-in panel.
- Static sample posts and comments in the Tambayan section.
- Menu categories with CSS hover previews.

## Built With

- HTML5
- CSS3
- JavaScript
- Local image assets (AVIF)
- Vercel for hosting and deployment

## Project Structure

```text
ITC/
├── website-files/
│   ├── index.html
│   ├── about.html
│   ├── menu.html
│   ├── community.html
│   └── contact.html
├── css/
│   └── style.css
├── images/
│   ├── README.md
│   └── cafe photos (.avif)
├── logo/
│   └── cafe logo
├── vercel.json
└── README.md
```

## Run the Website Locally

You can preview the website on your computer with a local server:

1. Download or clone this repository.
2. Open the project folder in a terminal.
3. Run:

   ```bash
   python -m http.server 8000
   ```

4. Open [http://localhost:8000/website-files/](http://localhost:8000/website-files/) in your browser.

The website uses root-relative paths for its CSS and images, so running it through a local server from the project folder is recommended instead of opening the HTML file directly.

## Demo Limitations

The log-in panel and community comment area are visual demonstrations only. They do not authenticate users, submit comments, save activity, or connect to a database. The menu does not process orders or payments.

## Live Website

Visit the deployed website here:

**[https://kape-ling-cafe.vercel.app/](https://kape-ling-cafe.vercel.app/)**

---

<div align="center">

  **Kape-ling Cafe** · *Kape muna. Dito ka lang.*

  <sub>Made as a web development project.</sub>

</div>
