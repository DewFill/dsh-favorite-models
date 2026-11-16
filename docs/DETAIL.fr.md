# Modèles favoris

Des étoiles dans le sélecteur de modèles de l’interface web de DeepSeek Harness, et
un bloc **Favoris** qui reprend les modèles marqués dans le menu racine du
sélecteur.

## Utilisation

1. Ouvrez le menu du modèle dans le composeur et allez dans **Model**.
2. Cliquez sur l’étoile juste après le nom d’un modèle : elle devient jaune.
3. Rouvrez le menu du modèle : sous les lignes **Model** et **Effort**, un bloc
   **Favourites** liste les modèles marqués avec leur fournisseur. Un clic sur une
   ligne bascule sur ce modèle et ferme le menu.
4. Un nouveau clic sur l’étoile retire le modèle des favoris.

Les modèles restent dans leurs groupes de fournisseurs : les favoris sont un
duplicata, pas un réordonnancement.

## Fonctionnement

Le plugin ne copie ni ne remplace l’interface de DSH. Il utilise deux slots
documentés du sélecteur de modèles intégré
(`@deepseek-ai/dsh-client-ui-model-selection`) :

- `conversation.input.model.label` — ajoute l’étoile au nom du modèle dans chaque
  ligne de la liste (le déclencheur réduit et la ligne **Model** du menu racine n’ont
  pas d’étoile) ;
- `conversation.input.model.options` — ajoute le bloc de favoris au menu racine, à
  côté des lignes fournies par les autres plugins.

Les favoris sont stockés dans le `localStorage` du navigateur sous la clé
`dsh.favorite-models.v1` et sont communs à toutes les sessions.

## Langues

Les textes du plugin et cette page suivent la langue de l’interface de DSH :
anglais, russe, chinois, japonais, espagnol, français, allemand et portugais. Les
autres langues retombent sur l’anglais.

## Limites

- Le bloc de favoris apparaît après les lignes **Model** et **Effort** : le slot ne
  permet d’ajouter des éléments qu’à cet endroit. Un groupe tout en haut de la liste
  des modèles exigerait de remplacer entièrement le sélecteur intégré.
- L’étoile n’existe que dans les lignes de modèles.
- Les favoris ne se synchronisent pas entre navigateurs ou appareils.
