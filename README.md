# Favourite models for DeepSeek Harness

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![DSH](https://img.shields.io/badge/dsh-%E2%89%A50.2.2--rc.3-2f6feb)](https://github.com/deepseek-ai/deepseek-harness)
[![npm](https://img.shields.io/npm/v/dsh-favorite-models)](https://www.npmjs.com/package/dsh-favorite-models)

English | [Русский](README.ru.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Português](README.pt.md)

A plugin for the DeepSeek Harness web UI that adds stars to the built-in model
picker: star any model, and a **Favourites** block appears in the selector's root
menu, where that model is one click away. Models stay in their provider groups.

| Model list with stars | The Favourites block |
| --- | --- |
| ![Model list with stars](docs/screenshots/model-list.png) | ![Favourites block](docs/screenshots/favourites-block.png) |

## Features

- A star right after every model name in the model list.
- Click the star to add a model to favourites; click it again to remove it.
- A **Favourites** block in the selector's root menu: starred models with their
  provider name, a check mark on the current model and a star to remove it.
- Clicking a favourite switches to that model and closes the menu.
- Favourites are shared across sessions and survive a DSH restart (stored in the
  browser's `localStorage`).
- Localized for every built-in DSH language; switching the language applies
  immediately, without a reload.

## Installation

Requirements: DeepSeek Harness `0.2.2-rc.3` or newer and the web UI (Desktop or
`dsh --profile web`).

### Option 1 — Plugin Market (Discover)

1. Open **Plugins → Discover**.
2. Click **Add index source** and add the index URL:

   ```text
   https://raw.githubusercontent.com/DewFill/dsh-favorite-models/main/index.json
   ```

3. Find **Favourite models** in the list and click **Install** (confirm the
   bundle installation).

Updates from this installation arrive through the same Discover tab.

### Option 2 — local directory

```bash
git clone https://github.com/DewFill/dsh-favorite-models.git
```

Open **Plugins → Installed → Add plugin** and pick the `dsh-favorite-models`
folder. The plugin activates immediately; if the window was already open and no
stars appear, reload the page.

### Option 3 — npm package

Open **Plugins → Installed → Add plugin**, enter `dsh-favorite-models`, review
the preview and confirm. The package is published to the npm registry with
provenance, so the installed code is traceable to this repository.

Updates arrive through **Plugins → Installed → Update** on the plugin card.

## Usage

1. Click the model name at the bottom of the composer (for example,
   “DeepSeek-V4.1-Flash”).
2. In the **Model** pane, click the star after the model you need — it turns
   yellow.
3. Open the model menu again: the **Favourites** block appears below the
   **Model** and **Effort** rows. Click a row to switch to that model.

## Languages

Plugin strings and its card in Plugins are localized for English, Russian,
Chinese, Japanese, Spanish, French, German and Portuguese. The language comes
from DSH settings (**Settings → General → Language**) and applies on the fly.
Other languages fall back to English. This README is available in every
supported language — see the links at the top.

## How it works

The plugin does not copy or replace the DSH interface — it uses two documented
slots of the shipped model selector
([`@deepseek-ai/dsh-client-ui-model-selection`](https://github.com/deepseek-ai/deepseek-harness)):

- `conversation.input.model.label` — appends the star to the model name in every
  list row;
- `conversation.input.model.options` — adds the Favourites block to the root
  menu, next to the rows contributed by other plugins.

DSH design updates therefore do not break the plugin: in the worst case only the
star and the favourites block stop rendering.

## Limitations

- The Favourites block sits after the **Model** and **Effort** rows: the slot only
  allows adding items there. A separate group at the very top of the model list
  would require replacing the shipped selector entirely, which was deliberately
  avoided.
- The star appears in the model rows; the collapsed composer trigger and the
  Model row have none.
- Favourites live in the browser (`localStorage`, key
  `dsh.favorite-models.v1`) and do not sync between browsers or devices.

## Updating and removing

- **Updating:** **Plugins → Discover** → the plugin card → **Update** (for
  installations from Git), or repeat the folder installation after `git pull`.
- **Removing:** **Plugins → Installed** → remove the bundle. Favourites stay in
  `localStorage` and come back if you install the plugin again.

## Development

```
.
├── client.js          # browser half: slots, stars, favourites block
├── index.js           # host half (empty: everything lives in the client)
├── cordis.patch.yml   # bundle row for the profile
├── package.json       # bundle and client-module manifest
├── index.json         # Plugin Market index for GitHub installs
├── locale/*.json      # title, description and the docs/DETAIL.md link per language
├── docs/DETAIL.md     # detailed plugin page description
├── docs/screenshots/  # README screenshots
└── icon.svg           # plugin icon
```

Syntax checks and local installation:

```bash
node --check client.js
node --check index.js
```

Then **Plugins → Installed → Add plugin** with this folder. Changes to
`client.js` are picked up after a page reload (or through HMR when
`pnpm run dev:web` is running).

## License

[MIT](LICENSE) © Artemy Fedorchenko
