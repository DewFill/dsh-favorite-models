# 收藏的模型 —— DeepSeek Harness 插件

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![DSH](https://img.shields.io/badge/dsh-%E2%89%A50.2.2--rc.3-2f6feb)](https://github.com/deepseek-ai/deepseek-harness)

[![npm](https://img.shields.io/npm/v/dsh-favorite-models)](https://www.npmjs.com/package/dsh-favorite-models)

[English](README.md) | [Русский](README.ru.md) | 中文 | [日本語](README.ja.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Português](README.pt.md)

DeepSeek Harness 模型菜单的收藏：您最常使用的模型，集中在一处。

| 带星标的模型列表 | 「收藏」区块 |
| --- | --- |
| ![带星标的模型列表](docs/screenshots/model-list.png) | ![「收藏」区块](docs/screenshots/favourites-block.png) |

## 功能

- 模型列表里每个模型名称后面都有星标。
- 点击星标加入收藏，再次点击取消收藏。
- 选择器根菜单中的「收藏」区块：列出已收藏的模型及其服务商，当前模型带勾选
  标记，右侧星标可取消收藏。
- 点击收藏项即切换到该模型并关闭菜单。
- 收藏在所有会话间共享，DSH 重启后仍然保留（存放在浏览器的 `localStorage`）。
- 已本地化到 DSH 的所有内置语言；切换语言立即生效，无需刷新页面。

## 安装

要求：DeepSeek Harness `0.2.2-rc.3` 或更新版本，以及网界面（桌面版或
`dsh --profile web`）。

### 方式一 —— 插件市场（Discover）

1. 打开 **Plugins → Discover**。
2. 点击 **Add index source**，添加索引地址：

   ```text
   https://raw.githubusercontent.com/DewFill/dsh-favorite-models/main/index.json
   ```

3. 在列表中找到 **收藏的模型**（Favourite models），点击 **Install**
   （需要确认安装该插件包）。

通过这种方式安装后，更新会在同一个 Discover 标签页中出现。

### 方式二 —— 本地文件夹

```bash
git clone https://github.com/DewFill/dsh-favorite-models.git
```

打开 **Plugins → Installed → Add plugin**，选择 `dsh-favorite-models` 文件夹。
插件会立即生效；如果窗口本来已经打开且没有出现星标，刷新页面即可。

### 方式三 —— npm 包

打开 **Plugins → Installed → Add plugin**，输入 `dsh-favorite-models`，查看预览并
确认安装。该包已带 provenance 发布到 npm，安装的代码可追溯到此仓库。

更新通过插件卡片上的 **Plugins → Installed → Update** 完成。

## 使用

1. 点击输入框下方的模型名称（例如「DeepSeek-V4.1-Flash」）。
2. 在 **Model** 面板中点击目标模型名称后面的星标，它会变成黄色。
3. 再次打开模型菜单：在 **Model** 和 **Effort** 两行下方会出现
   **Favourites** 区块。点击其中的一行即可切换模型。

## 语言

插件文案及其在 Plugins 中的卡片已本地化为英语、俄语、中文、日语、西班牙语、
法语、德语和葡萄牙语。语言取自 DSH 设置（**Settings → General → Language**），
即时生效。其他语言使用英语文案。本 README 提供所有受支持语言版本 —— 见文首
的链接。

## 实现方式

插件不复制、也不替换 DSH 的界面，只使用内置模型选择器
（[`@deepseek-ai/dsh-client-ui-model-selector`](https://github.com/deepseek-ai/deepseek-harness)）
的两个有文档的插槽：

- `conversation.input.model.label` —— 在列表每一行的模型名称后追加星标；
- `conversation.input.model.options` —— 在根菜单中、其他插件条目的旁边加入
  收藏区块。

因此 DSH 的界面改版不会破坏插件：最坏情况下只是星标和收藏区块不再显示。

## 限制

- 「收藏」区块位于 **Model** 和 **Effort** 两行之后：该插槽只允许在这些行之后
  添加条目。若要在模型列表最前面单独放一组，就必须整个替换内置选择器 —— 这是
  有意避免的方案。
- 星标只出现在模型行里；收起状态的输入框触发器和 **Model** 行没有星标。
- 收藏保存在浏览器中（`localStorage`，键名 `dsh.favorite-models.v1`），不会在
  浏览器或设备之间同步。

## 更新与卸载

- **更新：** **Plugins → Discover** → 插件卡片 → **Update**（适用于从 Git
  安装的版本），或在 `git pull` 后重新从文件夹安装。
- **卸载：** **Plugins → Installed** → 删除该插件包。收藏仍保留在
  `localStorage` 中，重新安装后会恢复。

## 开发

```
.
├── client.js          # 浏览器端：插槽、星标、收藏区块
├── index.js           # Host 端（为空：全部逻辑在 Client）
├── cordis.patch.yml   # 配置文件的插件包条目
├── package.json       # 插件包与客户端模块清单
├── index.json         # 用于 GitHub 安装的插件市场索引
├── locale/*.json      # 各语言的标题、描述和 docs/DETAIL.md 链接
├── docs/DETAIL.md     # 插件详情页的完整说明
├── docs/screenshots/  # README 截图
└── icon.svg           # 插件图标
```

语法检查与本地安装：

```bash
node --check client.js
node --check index.js
```

然后在 **Plugins → Installed → Add plugin** 中选择该文件夹。对 `client.js` 的
修改在刷新页面后生效（若运行着 `pnpm run dev:web`，则通过 HMR 生效）。

## 许可证

[MIT](LICENSE) © Artemy Fedorchenko
