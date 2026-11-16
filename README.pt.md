# Modelos favoritos para o DeepSeek Harness

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![DSH](https://img.shields.io/badge/dsh-%E2%89%A50.2.2--rc.3-2f6feb)](https://github.com/deepseek-ai/deepseek-harness)
[![npm](https://img.shields.io/npm/v/dsh-favorite-models)](https://www.npmjs.com/package/dsh-favorite-models)

[English](README.md) | [Русский](README.ru.md) | [中文](README.zh.md) | [日本語](README.ja.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | Português

Favoritos para o menu de modelos do DeepSeek Harness: os modelos a que mais volta, reunidos num só lugar.

| Lista de modelos com estrelas | O bloco Favoritos |
| --- | --- |
| ![Lista de modelos com estrelas](docs/screenshots/model-list.png) | ![Bloco Favoritos](docs/screenshots/favourites-block.png) |

## Funcionalidades

- Uma estrela logo após o nome de cada modelo na lista.
- Um clique na estrela adiciona o modelo aos favoritos, outro clique remove.
- Bloco **Favoritos** no menu raiz do seletor: modelos marcados com o respetivo
  fornecedor, uma marca de verificação no modelo atual e uma estrela para remover.
- Clicar num favorito muda para esse modelo e fecha o menu.
- Os favoritos são comuns a todas as sessões e sobrevivem a um reinício do DSH
  (guardados no `localStorage` do navegador).
- Traduzido para todos os idiomas integrados do DSH; a mudança de idioma aplica-se
  de imediato, sem recarregar.

## Instalação

Requisitos: DeepSeek Harness `0.2.2-rc.3` ou mais recente e a interface web
(Desktop ou `dsh --profile web`).

### Opção 1 — Plugin Market (Discover)

1. Abra **Plugins → Discover**.
2. Clique em **Add index source** e adicione o URL do índice:

   ```text
   https://raw.githubusercontent.com/DewFill/dsh-favorite-models/main/index.json
   ```

3. Encontre **Modelos favoritos** (Favourite models) na lista e clique em
   **Install** (é pedida confirmação da instalação do pacote).

As atualizações desta instalação chegam pelo mesmo separador Discover.

### Opção 2 — pasta local

```bash
git clone https://github.com/DewFill/dsh-favorite-models.git
```

Abra **Plugins → Installed → Add plugin** e escolha a pasta
`dsh-favorite-models`. O plugin ativa-se de imediato; se a janela já estava aberta
e as estrelas não aparecerem, recarregue a página.

### Opção 3 — pacote do npm

Abra **Plugins → Installed → Add plugin**, introduza `dsh-favorite-models`, veja a
pré-visualização e confirme. O pacote está publicado no npm com provenance, pelo
que o código instalado é rastreável até este repositório.

As atualizações chegam por **Plugins → Installed → Update** no cartão do plugin.

## Utilização

1. Clique no nome do modelo na parte inferior do compositor (por exemplo,
   «DeepSeek-V4.1-Flash»).
2. No painel **Model**, clique na estrela depois do modelo pretendido — fica
   amarela.
3. Abra novamente o menu do modelo: o bloco **Favourites** aparece abaixo das
   linhas **Model** e **Effort**. Clique numa linha para mudar para esse modelo.

## Idiomas

Os textos do plugin e o seu cartão em Plugins estão traduzidos para inglês, russo,
chinês, japonês, espanhol, francês, alemão e português. O idioma vem das definições
do DSH (**Settings → General → Language**) e aplica-se de imediato. Nos restantes
idiomas é usado o inglês. Este README existe em todos os idiomas suportados — veja
os links no início do ficheiro.

## Como funciona

O plugin não copia nem substitui a interface do DSH: usa dois slots documentados do
seletor de modelos integrado
([`@deepseek-ai/dsh-client-ui-model-selection`](https://github.com/deepseek-ai/deepseek-harness)):

- `conversation.input.model.label` — acrescenta a estrela ao nome do modelo em cada
  linha da lista;
- `conversation.input.model.options` — acrescenta o bloco de favoritos ao menu
  raiz, junto às linhas de outros plugins.

Por isso, as atualizações de design do DSH não quebram o plugin: no pior caso,
apenas a estrela e o bloco de favoritos deixam de ser apresentados.

## Limitações

- O bloco de favoritos fica depois das linhas **Model** e **Effort**: o slot só
  permite acrescentar itens aí. Um grupo próprio no início da lista de modelos
  exigiria substituir por completo o seletor integrado, o que foi evitado de
  propósito.
- A estrela aparece nas linhas de modelos; o acionador recolhido do compositor e a
  linha Model não a têm.
- Os favoritos ficam no navegador (`localStorage`, chave
  `dsh.favorite-models.v1`) e não sincronizam entre navegadores ou dispositivos.

## Atualização e remoção

- **Atualização:** **Plugins → Discover** → cartão do plugin → **Update** (para
  instalações a partir de Git), ou repita a instalação a partir da pasta após
  `git pull`.
- **Remoção:** **Plugins → Installed** → remover o pacote. Os favoritos permanecem
  no `localStorage` e voltam se reinstalar o plugin.

## Desenvolvimento

```
.
├── client.js          # metade do navegador: slots, estrela, bloco de favoritos
├── index.js           # metade Host (vazia: tudo está no cliente)
├── cordis.patch.yml   # linha do pacote para o perfil
├── package.json       # manifesto do pacote e do módulo cliente
├── index.json         # índice do Plugin Market para instalar a partir do GitHub
├── locale/*.json      # título, descrição e ligação a docs/DETAIL.md por idioma
├── docs/DETAIL.md     # descrição detalhada para a página do plugin
├── docs/screenshots/  # capturas de ecrã para o README
└── icon.svg           # ícone do plugin
```

Verificação de sintaxe e instalação local:

```bash
node --check client.js
node --check index.js
```

Depois, **Plugins → Installed → Add plugin** com esta pasta. As alterações em
`client.js` são aplicadas após recarregar a página (ou por HMR quando
`pnpm run dev:web` está a correr).

## Licença

[MIT](LICENSE) © Artemy Fedorchenko
