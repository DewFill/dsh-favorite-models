# Modelos favoritos

Estrellas en el selector de modelos de la interfaz web de DeepSeek Harness, y un
bloque **Favoritos** que duplica los modelos marcados en el menú raíz del selector.

## Uso

1. Abre el menú del modelo en el compositor y entra en **Model**.
2. Haz clic en la estrella situada justo después del nombre de un modelo: se pone
   amarilla.
3. Abre de nuevo el menú del modelo: bajo las filas **Model** y **Effort** aparece
   un bloque **Favourites** con los modelos marcados y sus proveedores. Al hacer
   clic en una fila se cambia a ese modelo y se cierra el menú.
4. Otro clic en la estrella quita el modelo de favoritos.

Los modelos siguen en sus grupos de proveedores: los favoritos son un duplicado, no
un reordenamiento.

## Cómo funciona

El plugin no copia ni sustituye la interfaz de DSH. Usa dos ranuras documentadas del
selector de modelos integrado (`@deepseek-ai/dsh-client-ui-model-selection`):

- `conversation.input.model.label` — añade la estrella al nombre del modelo en cada
  fila de la lista (el disparador contraído y la fila **Model** del menú raíz no
  tienen estrella);
- `conversation.input.model.options` — añade el bloque de favoritos al menú raíz,
  junto a las filas de otros plugins.

Los favoritos se guardan en el `localStorage` del navegador con la clave
`dsh.favorite-models.v1` y son comunes a todas las sesiones.

## Idiomas

Los textos del plugin y esta página siguen el idioma de la interfaz de DSH: inglés,
ruso, chino, japonés, español, francés, alemán y portugués. Para otros idiomas se usa
el inglés.

## Limitaciones

- El bloque de favoritos aparece después de las filas **Model** y **Effort**: la
  ranura solo permite añadir elementos ahí. Un grupo al principio de la lista de
  modelos exigiría sustituir por completo el selector integrado.
- La estrella solo existe en las filas de modelos.
- Los favoritos no se sincronizan entre navegadores ni dispositivos.
