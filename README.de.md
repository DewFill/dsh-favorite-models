# Favoriten-Modelle für DeepSeek Harness

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![DSH](https://img.shields.io/badge/dsh-%E2%89%A50.2.2--rc.3-2f6feb)](https://github.com/deepseek-ai/deepseek-harness)
[![npm](https://img.shields.io/npm/v/dsh-favorite-models)](https://www.npmjs.com/package/dsh-favorite-models)

[English](README.md) | [Русский](README.ru.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Español](README.es.md) | [Français](README.fr.md) | Deutsch | [Português](README.pt.md)

Favoriten für das Modellmenü von DeepSeek Harness — die Modelle, zu denen Sie am häufigsten zurückkehren, an einem Ort.

| Modellliste mit Sternen | Der Favoriten-Block |
| --- | --- |
| ![Modellliste mit Sternen](docs/screenshots/model-list.png) | ![Favoriten-Block](docs/screenshots/favourites-block.png) |

## Funktionen

- Ein Stern direkt nach jedem Modellnamen in der Modellliste.
- Klick auf den Stern fügt das Modell zu den Favoriten hinzu, ein weiterer Klick
  entfernt es.
- Ein Block **Favoriten** im Wurzelmenü des Selektors: markierte Modelle mit ihrem
  Anbieter, ein Häkchen beim aktuellen Modell und ein Stern zum Entfernen.
- Klick auf einen Favoriten wechselt auf dieses Modell und schließt das Menü.
- Favoriten gelten für alle Sitzungen und überstehen einen DSH-Neustart (gespeichert
  im `localStorage` des Browsers).
- Für alle in DSH eingebauten Sprachen lokalisiert; ein Sprachwechsel wirkt sofort,
  ohne Neuladen.

## Installation

Voraussetzungen: DeepSeek Harness `0.2.2-rc.3` oder neuer und die Web-Oberfläche
(Desktop oder `dsh --profile web`).

### Variante 1 — Plugin Market (Discover)

1. **Plugins → Discover** öffnen.
2. Auf **Add index source** klicken und die Index-URL hinzufügen:

   ```text
   https://raw.githubusercontent.com/DewFill/dsh-favorite-models/main/index.json
   ```

3. In der Liste **Favourite models** (Favoriten-Modelle) suchen und **Install**
   anklicken (die Installation des Bundles muss bestätigt werden).

Updates dieser Installation kommen über denselben Discover-Tab.

### Variante 2 — lokaler Ordner

```bash
git clone https://github.com/DewFill/dsh-favorite-models.git
```

**Plugins → Installed → Add plugin** öffnen und den Ordner `dsh-favorite-models`
auswählen. Das Plugin wird sofort aktiv; war das Fenster bereits offen und
erscheinen keine Sterne, die Seite neu laden.

### Variante 3 — npm-Paket

**Plugins → Installed → Add plugin** öffnen, `dsh-favorite-models` eingeben, die
Vorschau prüfen und die Installation bestätigen. Das Paket ist mit Provenance im
npm-Registry veröffentlicht, der installierte Code ist also bis zu diesem
Repository nachvollziehbar.

Updates kommen über **Plugins → Installed → Update** auf der Plugin-Karte.

## Verwendung

1. Auf den Modellnamen unten im Composer klicken (zum Beispiel
   „DeepSeek-V4.1-Flash“).
2. Im Bereich **Model** den Stern hinter dem gewünschten Modell anklicken — er wird
   gelb.
3. Das Modellmenü erneut öffnen: Unter den Zeilen **Model** und **Effort**
   erscheint der Block **Favourites**. Ein Klick auf eine Zeile wechselt das Modell.

## Sprachen

Die Texte des Plugins und seine Karte unter Plugins sind für Englisch, Russisch,
Chinesisch, Japanisch, Spanisch, Französisch, Deutsch und Portugiesisch
lokalisiert. Die Sprache kommt aus den DSH-Einstellungen
(**Settings → General → Language**) und wirkt sofort. Für andere Sprachen wird
Englisch verwendet. Diese README gibt es in allen unterstützten Sprachen — siehe
die Links oben.

## Funktionsweise

Das Plugin kopiert oder ersetzt die DSH-Oberfläche nicht, sondern nutzt zwei
dokumentierte Slots des integrierten Modellselektors
([`@deepseek-ai/dsh-client-ui-model-selection`](https://github.com/deepseek-ai/deepseek-harness)):

- `conversation.input.model.label` — ergänzt den Stern am Modellnamen in jeder
  Listenzeile;
- `conversation.input.model.options` — fügt den Favoriten-Block im Wurzelmenü
  neben den Zeilen anderer Plugins ein.

Design-Updates von DSH brechen das Plugin daher nicht: im schlimmsten Fall werden
nur der Stern und der Favoriten-Block nicht mehr angezeigt.

## Einschränkungen

- Der Favoriten-Block steht nach den Zeilen **Model** und **Effort**: Der Slot
  erlaubt nur dort Ergänzungen. Eine eigene Gruppe ganz oben in der Modellliste
  würde den vollständigen Austausch des integrierten Selektors erfordern — das
  wurde bewusst vermieden.
- Der Stern erscheint in den Modellzeilen; der eingeklappte Composer-Trigger und
  die Zeile Model haben keinen.
- Favoriten liegen im Browser (`localStorage`, Schlüssel
  `dsh.favorite-models.v1`) und werden nicht zwischen Browsern oder Geräten
  synchronisiert.

## Aktualisieren und Entfernen

- **Aktualisieren:** **Plugins → Discover** → Plugin-Karte → **Update** (für
  Installationen aus Git), oder die Ordnerinstallation nach `git pull`
  wiederholen.
- **Entfernen:** **Plugins → Installed** → Bundle entfernen. Favoriten bleiben im
  `localStorage` und kehren bei einer Neuinstallation zurück.

## Entwicklung

```
.
├── client.js          # Browser-Hälfte: Slots, Stern, Favoriten-Block
├── index.js           # Host-Hälfte (leer: alles steckt im Client)
├── cordis.patch.yml   # Bundle-Zeile für das Profil
├── package.json       # Manifest für Bundle und Client-Modul
├── index.json         # Plugin-Market-Index für die Installation von GitHub
├── locale/*.json      # Titel, Beschreibung und docs/DETAIL.md-Link je Sprache
├── docs/DETAIL.md     # ausführliche Beschreibung für die Plugin-Seite
├── docs/screenshots/  # README-Screenshots
└── icon.svg           # Plugin-Icon
```

Syntaxprüfung und lokale Installation:

```bash
node --check client.js
node --check index.js
```

Danach **Plugins → Installed → Add plugin** mit diesem Ordner. Änderungen an
`client.js` werden nach einem Neuladen der Seite übernommen (oder per HMR, wenn
`pnpm run dev:web` läuft).

## Lizenz

[MIT](LICENSE) © Artemy Fedorchenko
