# Favourite models

Stars in the model picker of the DeepSeek Harness web UI, plus a Favourites
block that duplicates the starred models in the selector's root menu.

## Usage

1. Open the model menu in the composer and go to **Model**.
2. Click the star right after a model name — it turns yellow.
3. Open the model menu again: under the **Model** and **Effort** rows a
   **Favourites** block lists the starred models with their providers. Clicking
   a row switches to that model and closes the menu.
4. Clicking the star again removes the model from favourites.

Models stay where they are in their provider groups: favourites are a duplicate,
not a reorder.

## How it works

The plugin does not copy or replace the DSH interface. It uses two documented
slots of the shipped model selector
(`@deepseek-ai/dsh-client-ui-model-selection`):

- `conversation.input.model.label` — appends the star to the model name in every
  list row (the collapsed trigger and the root-menu **Model** row have no star);
- `conversation.input.model.options` — adds the Favourites block to the root
  menu, next to the rows contributed by other plugins.

Favourites are stored in the browser's `localStorage` under
`dsh.favorite-models.v1` and are shared by all sessions.

## Languages

Strings and this page follow the DSH UI language: English, Russian, Chinese,
Japanese, Spanish, French, German and Portuguese. Other languages fall back to
English.

## Limitations

- The Favourites block appears after the **Model** and **Effort** rows: the slot
  only allows adding items there. A group at the very top of the model list would
  require replacing the shipped selector.
- The star exists in the model rows only.
- Favourites do not sync between browsers or devices.
