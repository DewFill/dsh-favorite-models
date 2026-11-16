# Modelos favoritos

Estrelas no seletor de modelos da interface web do DeepSeek Harness e um bloco
**Favoritos** que duplica os modelos marcados no menu raiz do seletor.

## Utilização

1. Abra o menu do modelo no compositor e entre em **Model**.
2. Clique na estrela logo após o nome de um modelo — fica amarela.
3. Abra novamente o menu do modelo: abaixo das linhas **Model** e **Effort**
   aparece um bloco **Favourites** com os modelos marcados e os respetivos
   fornecedores. Clicar numa linha muda para esse modelo e fecha o menu.
4. Outro clique na estrela remove o modelo dos favoritos.

Os modelos continuam nos grupos dos respetivos fornecedores: os favoritos são uma
duplicação, não uma reordenação.

## Como funciona

O plugin não copia nem substitui a interface do DSH. Usa dois slots documentados do
seletor de modelos integrado (`@deepseek-ai/dsh-client-ui-model-selection`):

- `conversation.input.model.label` — acrescenta a estrela ao nome do modelo em cada
  linha da lista (o acionador recolhido e a linha **Model** do menu raiz não têm
  estrela);
- `conversation.input.model.options` — acrescenta o bloco de favoritos ao menu raiz,
  junto às linhas de outros plugins.

Os favoritos são guardados no `localStorage` do navegador com a chave
`dsh.favorite-models.v1` e são comuns a todas as sessões.

## Idiomas

Os textos do plugin e esta página seguem o idioma da interface do DSH: inglês,
russo, chinês, japonês, espanhol, francês, alemão e português. Nos restantes idiomas
é usado o inglês.

## Limitações

- O bloco de favoritos aparece depois das linhas **Model** e **Effort**: o slot só
  permite acrescentar itens aí. Um grupo no início da lista de modelos exigiria
  substituir por completo o seletor integrado.
- A estrela existe apenas nas linhas de modelos.
- Os favoritos não sincronizam entre navegadores ou dispositivos.
