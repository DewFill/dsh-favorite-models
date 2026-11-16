# Modèles favoris pour DeepSeek Harness

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![DSH](https://img.shields.io/badge/dsh-%E2%89%A50.2.2--rc.3-2f6feb)](https://github.com/deepseek-ai/deepseek-harness)
[![npm](https://img.shields.io/npm/v/dsh-favorite-models)](https://www.npmjs.com/package/dsh-favorite-models)

[English](README.md) | [Русский](README.ru.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Español](README.es.md) | Français | [Deutsch](README.de.md) | [Português](README.pt.md)

Favoris pour le menu des modèles de DeepSeek Harness : les modèles vers lesquels vous revenez le plus, réunis au même endroit.

| Liste des modèles avec les étoiles | Le bloc Favoris |
| --- | --- |
| ![Liste des modèles avec les étoiles](docs/screenshots/model-list.png) | ![Bloc Favoris](docs/screenshots/favourites-block.png) |

## Fonctionnalités

- Une étoile juste après le nom de chaque modèle dans la liste.
- Un clic sur l’étoile ajoute le modèle aux favoris, un second clic le retire.
- Un bloc **Favoris** dans le menu racine du sélecteur : les modèles marqués avec
  leur fournisseur, une coche sur le modèle courant et une étoile pour le retirer.
- Un clic sur un favori bascule sur ce modèle et ferme le menu.
- Les favoris sont communs à toutes les sessions et survivent à un redémarrage de
  DSH (stockés dans le `localStorage` du navigateur).
- Traduit dans toutes les langues intégrées de DSH ; le changement de langue
  s’applique aussitôt, sans rechargement.

## Installation

Prérequis : DeepSeek Harness `0.2.2-rc.3` ou plus récent et l’interface web
(Desktop ou `dsh --profile web`).

### Option 1 — Plugin Market (Discover)

1. Ouvrez **Plugins → Discover**.
2. Cliquez sur **Add index source** et ajoutez l’URL de l’index :

   ```text
   https://raw.githubusercontent.com/DewFill/dsh-favorite-models/main/index.json
   ```

3. Trouvez **Modèles favoris** (Favourite models) dans la liste et cliquez sur
   **Install** (la confirmation d’installation du bundle est demandée).

Les mises à jour de cette installation arrivent depuis le même onglet Discover.

### Option 2 — dossier local

```bash
git clone https://github.com/DewFill/dsh-favorite-models.git
```

Ouvrez **Plugins → Installed → Add plugin** et choisissez le dossier
`dsh-favorite-models`. Le plugin s’active immédiatement ; si la fenêtre était déjà
ouverte et que les étoiles n’apparaissent pas, rechargez la page.

### Option 3 — paquet npm

Ouvrez **Plugins → Installed → Add plugin**, saisissez `dsh-favorite-models`,
vérifiez l’aperçu puis confirmez. Le paquet est publié sur npm avec provenance :
le code installé est donc traçable jusqu’à ce dépôt.

Les mises à jour arrivent via **Plugins → Installed → Update** sur la fiche du
plugin.

## Utilisation

1. Cliquez sur le nom du modèle en bas du composeur (par exemple
   « DeepSeek-V4.1-Flash »).
2. Dans le panneau **Model**, cliquez sur l’étoile après le modèle souhaité : elle
   devient jaune.
3. Rouvrez le menu du modèle : le bloc **Favourites** apparaît sous les lignes
   **Model** et **Effort**. Cliquez sur une ligne pour basculer sur ce modèle.

## Langues

Les textes du plugin et sa fiche dans Plugins sont traduits en anglais, russe,
chinois, japonais, espagnol, français, allemand et portugais. La langue provient
des réglages de DSH (**Settings → General → Language**) et s’applique à la volée.
Les autres langues retombent sur l’anglais. Ce README existe dans toutes les
langues prises en charge — voir les liens en haut du fichier.

## Fonctionnement

Le plugin ne copie ni ne remplace l’interface de DSH : il utilise deux slots
documentés du sélecteur de modèles intégré
([`@deepseek-ai/dsh-client-ui-model-selection`](https://github.com/deepseek-ai/deepseek-harness)) :

- `conversation.input.model.label` — ajoute l’étoile au nom du modèle dans chaque
  ligne de la liste ;
- `conversation.input.model.options` — ajoute le bloc de favoris au menu racine, à
  côté des lignes fournies par les autres plugins.

Les mises à jour de design de DSH ne cassent donc pas le plugin : au pire, seules
l’étoile et le bloc de favoris cessent de s’afficher.

## Limites

- Le bloc de favoris se trouve après les lignes **Model** et **Effort** : le slot
  ne permet d’ajouter des éléments qu’à cet endroit. Un groupe distinct tout en
  haut de la liste des modèles exigerait de remplacer entièrement le sélecteur
  intégré, ce qui a été volontairement évité.
- L’étoile apparaît dans les lignes de modèles ; le déclencheur réduit du
  composeur et la ligne Model n’en ont pas.
- Les favoris restent dans le navigateur (`localStorage`, clé
  `dsh.favorite-models.v1`) et ne se synchronisent pas entre navigateurs ou
  appareils.

## Mise à jour et désinstallation

- **Mise à jour :** **Plugins → Discover** → la fiche du plugin → **Update** (pour
  les installations depuis Git), ou refaites l’installation depuis le dossier
  après un `git pull`.
- **Désinstallation :** **Plugins → Installed** → supprimez le bundle. Les favoris
  restent dans `localStorage` et reviennent si vous réinstallez le plugin.

## Développement

```
.
├── client.js          # moitié navigateur : slots, étoile, bloc de favoris
├── index.js           # moitié Host (vide : tout vit dans le client)
├── cordis.patch.yml   # ligne du bundle pour le profil
├── package.json       # manifeste du bundle et du module client
├── index.json         # index Plugin Market pour l’installation depuis GitHub
├── locale/*.json      # titre, description et lien docs/DETAIL.md par langue
├── docs/DETAIL.md     # description détaillée pour la page du plugin
├── docs/screenshots/  # captures d’écran du README
└── icon.svg           # icône du plugin
```

Vérification de la syntaxe et installation locale :

```bash
node --check client.js
node --check index.js
```

Ensuite **Plugins → Installed → Add plugin** avec ce dossier. Les modifications de
`client.js` sont prises en compte après un rechargement de la page (ou par HMR si
`pnpm run dev:web` tourne).

## Licence

[MIT](LICENSE) © Artemy Fedorchenko
