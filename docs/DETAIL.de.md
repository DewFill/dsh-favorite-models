# Favoriten-Modelle

Sterne im Modellselektor der DeepSeek Harness Web-Oberfläche und ein
**Favoriten**-Block, der die markierten Modelle im Wurzelmenü des Selektors
dupliziert.

## Verwendung

1. Das Modellmenü im Composer öffnen und zu **Model** gehen.
2. Den Stern direkt hinter einem Modellnamen anklicken — er wird gelb.
3. Das Modellmenü erneut öffnen: Unter den Zeilen **Model** und **Effort**
   erscheint ein **Favourites**-Block mit den markierten Modellen und ihren
   Anbietern. Ein Klick auf eine Zeile wechselt das Modell und schließt das Menü.
4. Ein weiterer Klick auf den Stern entfernt das Modell aus den Favoriten.

Die Modelle bleiben in ihren Anbietergruppen: Favoriten sind eine Dublette, keine
Umordnung.

## Funktionsweise

Das Plugin kopiert oder ersetzt die DSH-Oberfläche nicht. Es nutzt zwei
dokumentierte Slots des integrierten Modellselektors
(`@deepseek-ai/dsh-client-ui-model-selection`):

- `conversation.input.model.label` — ergänzt den Stern am Modellnamen in jeder
  Listenzeile (der eingeklappte Trigger und die **Model**-Zeile im Wurzelmenü haben
  keinen Stern);
- `conversation.input.model.options` — fügt den Favoriten-Block im Wurzelmenü neben
  den Zeilen anderer Plugins ein.

Favoriten liegen im `localStorage` des Browsers unter dem Schlüssel
`dsh.favorite-models.v1` und gelten für alle Sitzungen.

## Sprachen

Die Texte des Plugins und diese Seite folgen der DSH-Oberflächensprache: Englisch,
Russisch, Chinesisch, Japanisch, Spanisch, Französisch, Deutsch und Portugiesisch.
Für andere Sprachen wird Englisch verwendet.

## Einschränkungen

- Der Favoriten-Block erscheint nach den Zeilen **Model** und **Effort**: Der Slot
  erlaubt nur dort Ergänzungen. Eine Gruppe ganz oben in der Modellliste würde den
  vollständigen Austausch des integrierten Selektors erfordern.
- Der Stern existiert nur in den Modellzeilen.
- Favoriten werden nicht zwischen Browsern oder Geräten synchronisiert.
