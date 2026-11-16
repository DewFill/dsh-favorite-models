/**
 * Favourite models — Client half.
 *
 * Two documented extension points of the shipped composer model selector,
 * nothing of the shipped UI is copied or replaced:
 *
 * 1. `conversation.input.model.label` — renders the model name plus a star in
 *    every model row. Starring adds the model to a local favourites list.
 * 2. `conversation.input.model.options` — appends a "Избранные" block to the
 *    selector's root menu, where the starred models are listed again and can
 *    be picked in one click. The models stay in their provider groups.
 *
 * If the shipped selector changes its internals, the worst case is that these
 * two slots stop rendering; no DSH styles or components are forked here.
 */
window.__ModuleLoader__.load({
  id: 'dsh-favorite-models',
  factory(require) {
    const React = require('react');
    const { Tag } = require('@deepseek-ai/dsh-client-ui-primitives');
    const h = React.createElement;

    const NS = 'favorite-models';
    const STORAGE_KEY = 'dsh.favorite-models.v1';

    /* ------------------------------------------------------------------ *
     * Favourites: one module-level list, newest first.
     * ------------------------------------------------------------------ */

    let favoriteIds = readStored();
    const favoriteListeners = new Set();

    function readStored() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw === null) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(id => typeof id === 'string' && id.length > 0);
      } catch (error) {
        console.warn('favorite-models: cannot read favourites', error);
        return [];
      }
    }

    function notify() {
      for (const listener of favoriteListeners) listener();
    }

    function storeFavorites(next) {
      favoriteIds = next;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (error) {
        console.warn('favorite-models: cannot save favourites', error);
      }
      notify();
    }

    function reloadStored() {
      const stored = readStored();
      if (stored.join('\n') === favoriteIds.join('\n')) return;
      favoriteIds = stored;
      notify();
    }

    function subscribeFavorites(listener) {
      favoriteListeners.add(listener);
      return () => { favoriteListeners.delete(listener) };
    }

    function getFavorites() {
      return favoriteIds;
    }

    const favoritesSource = { getSnapshot: getFavorites, subscribe: subscribeFavorites };

    function keyOf(providerId, modelId) {
      return `${providerId}/${modelId}`;
    }

    function splitKey(key) {
      const separator = key.indexOf('/');
      if (separator <= 0) return null;
      return { provider: key.slice(0, separator), model: key.slice(separator + 1) };
    }

    function toggleFavorite(key) {
      if (favoriteIds.includes(key)) {
        storeFavorites(favoriteIds.filter(candidate => candidate !== key));
        return;
      }
      storeFavorites([key, ...favoriteIds]);
    }

    /* ------------------------------------------------------------------ *
     * Styles: only theme tokens, no sizes or colours of our own invention.
     * ------------------------------------------------------------------ */

    const CSS = `
.dfm-label { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; }
.dfm-label-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dfm-star {
  display: inline-flex; align-items: center; justify-content: center; flex: none;
  width: 18px; height: 18px; padding: 0; border: none; border-radius: var(--dsw-radius-sm);
  background: transparent; color: var(--dsw-alias-label-caption);
  opacity: .55; cursor: pointer; vertical-align: middle;
}
.dfm-star:hover { background: var(--dsw-alias-interactive-bg-hover); opacity: 1; }
.dfm-star:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; opacity: 1; }
.dfm-star[data-on] { color: var(--dsw-alias-state-warn-primary); opacity: 1; }
@media (prefers-reduced-motion: no-preference) { .dfm-star { transition: opacity .12s ease, color .12s ease; } }

.dfm-favorites { display: flex; flex-direction: column; min-height: 0; margin-top: 3px; }
.dfm-favorites-title {
  padding: 6px 7px 3px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
  line-height: 16px;
}
.dfm-favorite {
  box-sizing: border-box; display: flex; align-items: center; gap: 6px;
  width: auto; min-width: 100%; min-height: 34px; padding: 5px 7px;
  border: none; border-radius: var(--dsw-radius-md); outline: none;
  background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer;
}
.dfm-favorite:focus-visible { background: var(--dsw-alias-interactive-bg-hover); }
@media (hover: hover) { .dfm-favorite:not(:disabled):hover { background: var(--dsw-alias-interactive-bg-hover); } }
.dfm-favorite:disabled { color: var(--dsw-alias-label-dimmed); cursor: default; }
.dfm-favorite-check {
  display: grid; place-items: center; flex: 0 0 14px;
  color: var(--dsw-alias-label-primary);
}
.dfm-favorite-check svg { width: 14px; height: 14px; }
.dfm-favorite-name {
  flex: 1 1 auto; min-width: 0; overflow: hidden;
  font-size: 13px; line-height: 18px; text-overflow: ellipsis; white-space: nowrap;
}
.dfm-favorite-provider {
  flex: none; color: var(--dsw-alias-label-caption); font-size: 11px; line-height: 16px;
}
`;

    function starIcon(filled) {
      let strokeWidth = 1.7;
      let fill = 'none';
      if (filled) {
        strokeWidth = 0;
        fill = 'currentColor';
      }
      return h('svg', {
        viewBox: '0 0 24 24', width: 13, height: 13, 'aria-hidden': true,
        fill,
        stroke: 'currentColor', strokeWidth, strokeLinejoin: 'round',
      }, h('path', {
        d: 'M12 3.4l2.72 5.52 6.08.88-4.4 4.29 1.04 6.06L12 17.29l-5.44 2.86 1.04-6.06-4.4-4.29 6.08-.88z',
      }));
    }

    function checkIcon() {
      return h('svg', {
        viewBox: '0 0 24 24', width: 14, height: 14, 'aria-hidden': true,
        fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round',
      }, h('path', { d: 'M5 12.5l4.4 4.4L19 7.2' }));
    }

    function starButton(isFavorite, label, onToggle) {
      let starAttribute;
      if (isFavorite) starAttribute = '';
      return h('span', {
        className: 'dfm-star',
        role: 'button',
        tabIndex: 0,
        'data-on': starAttribute,
        'aria-pressed': isFavorite,
        'aria-label': label,
        title: label,
        onMouseDown: event => { event.stopPropagation() },
        onClick: event => {
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        },
        onKeyDown: event => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        },
      }, starIcon(isFavorite));
    }

    /* ------------------------------------------------------------------ *
     * 1. Star after every model name.
     * ------------------------------------------------------------------ */

    function ModelLabel(props) {
      const { provider, model, placement, t, resolveText, toggleFavorite, useFavorites } = props;
      const key = keyOf(provider.id, model.id);
      const favorites = useFavorites(snapshot => snapshot);
      const isFavorite = favorites.includes(key);

      let tr = t;
      if (typeof tr !== 'function') tr = candidate => candidate;

      let starLabel = tr('favorite.add', { model: model.name });
      if (isFavorite) starLabel = tr('favorite.remove', { model: model.name });

      let badge = null;
      if (model.badge !== undefined && typeof resolveText === 'function') {
        badge = h(Tag, { tone: model.badge.tone }, resolveText(model.badge.text));
      }
      const nameChild = h('span', { key: 'name', className: 'dfm-label-name' }, model.name);

      const parts = [h('style', { key: 'style' }, CSS)];
      if (placement === 'option') {
        let starAttribute;
        if (isFavorite) starAttribute = '';
        const children = [nameChild];
        if (badge !== null) {
          children.push(' ');
          children.push(badge);
        }
        children.push(h('span', {
          key: 'star',
          className: 'dfm-star',
          role: 'button',
          tabIndex: 0,
          'data-on': starAttribute,
          'aria-pressed': isFavorite,
          'aria-label': starLabel,
          title: starLabel,
          onMouseDown: event => { event.stopPropagation() },
          onClick: event => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(key);
          },
          onKeyDown: event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(key);
          },
        }, starIcon(isFavorite)));
        parts.push(h('span', { key: 'label', className: 'dfm-label' }, ...children));
      } else if (badge === null) {
        parts.push(h('span', { key: 'label', className: 'dfm-label' }, nameChild));
      } else if (placement === 'trigger') {
        parts.push(h('span', { key: 'label', className: 'dfm-label' }, badge, ' ', nameChild));
      } else {
        parts.push(h('span', { key: 'label', className: 'dfm-label' }, nameChild, ' ', badge));
      }
      return h(React.Fragment, null, ...parts);
    }

    /* ------------------------------------------------------------------ *
     * 2. "Избранные" block in the selector's root menu.
     * ------------------------------------------------------------------ */

    function FavoriteList(props) {
      const { locked, dismiss, reportFailure, t, tm, toggleFavorite, select, useFavorites, useModels } = props;
      const favorites = useFavorites(snapshot => snapshot);
      const state = useModels(snapshot => snapshot);

      let tr = t;
      if (typeof tr !== 'function') tr = candidate => candidate;
      let translateModels = tm;
      if (typeof translateModels !== 'function') translateModels = candidate => candidate;

      if (favorites.length === 0) return null;

      const rows = [];
      for (const key of favorites) {
        const parsed = splitKey(key);
        if (parsed === null) continue;
        const group = state.groups.find(candidate => candidate.id === parsed.provider);
        if (group === undefined) continue;
        const model = group.models.find(candidate => candidate.id === parsed.model);
        if (model === undefined) continue;
        let providerName = group.name;
        if (group.id === 'deepseek-account') providerName = translateModels('provider.account');
        rows.push({ key, group, model, providerName });
      }
      if (rows.length === 0) return null;

      const busy = state.pending !== null || state.status === 'selecting';
      const disabled = locked || busy;

      const choose = row => {
        const selection = { provider: row.group.id, model: row.model.id };
        let effort;
        if (row.model.reasoning !== undefined) effort = row.model.reasoning.defaultEffort;
        if (effort !== undefined) selection.reasoningEffort = effort;
        select(selection).then(result => {
          if (result === undefined || result.ok) {
            dismiss();
            return;
          }
          reportFailure(tr('error.select', { message: `${result.error.code}: ${result.error.message}` }));
        }).catch(error => {
          reportFailure(tr('error.select', { message: String(error) }));
        });
      };

      const items = rows.map(row => {
        let selected = false;
        if (state.current !== null && state.current.provider === row.group.id
          && state.current.model === row.model.id) selected = true;
        let check = null;
        if (selected) check = checkIcon();
        return h('button', {
          key: row.key,
          type: 'button',
          role: 'menuitemradio',
          'aria-checked': selected,
          className: 'dfm-favorite',
          disabled,
          title: `${row.model.name} · ${row.providerName}`,
          onClick: () => { choose(row) },
        },
        h('span', { className: 'dfm-favorite-name' }, row.model.name),
        h('span', { className: 'dfm-favorite-provider' }, row.providerName),
        starButton(true, tr('favorite.remove', { model: row.model.name }), () => { toggleFavorite(row.key) }),
        h('span', { className: 'dfm-favorite-check' }, check));
      });

      return h(React.Fragment, null,
        h('style', null, CSS),
        h('div', {
          className: 'dfm-favorites', role: 'group', 'aria-label': tr('favorites.title'),
        },
        h('div', { className: 'dfm-favorites-title' }, tr('favorites.title')),
        ...items));
    }

    /* ------------------------------------------------------------------ *
     * Dictionaries.
     * ------------------------------------------------------------------ */

    const en = {
      'favorites.title': 'Favourites',
      'favorite.add': 'Add “{model}” to favourites',
      'favorite.remove': 'Remove “{model}” from favourites',
      'error.select': 'Could not switch the model: {message}',
    };
    const zh = {
      'favorites.title': '收藏',
      'favorite.add': '将「{model}」加入收藏',
      'favorite.remove': '将「{model}」移出收藏',
      'error.select': '无法切换模型：{message}',
    };
    const ja = {
      'favorites.title': 'お気に入り',
      'favorite.add': '「{model}」をお気に入りに追加',
      'favorite.remove': '「{model}」をお気に入りから削除',
      'error.select': 'モデルを切り替えられませんでした: {message}',
    };
    const es = {
      'favorites.title': 'Favoritos',
      'favorite.add': 'Añadir «{model}» a favoritos',
      'favorite.remove': 'Quitar «{model}» de favoritos',
      'error.select': 'No se pudo cambiar el modelo: {message}',
    };
    const fr = {
      'favorites.title': 'Favoris',
      'favorite.add': 'Ajouter « {model} » aux favoris',
      'favorite.remove': 'Retirer « {model} » des favoris',
      'error.select': 'Impossible de changer de modèle : {message}',
    };
    const de = {
      'favorites.title': 'Favoriten',
      'favorite.add': '„{model}“ zu Favoriten hinzufügen',
      'favorite.remove': '„{model}“ aus Favoriten entfernen',
      'error.select': 'Modell konnte nicht gewechselt werden: {message}',
    };
    const ru = {
      'favorites.title': 'Избранные',
      'favorite.add': 'Добавить «{model}» в избранное',
      'favorite.remove': 'Убрать «{model}» из избранного',
      'error.select': 'Не удалось переключить модель: {message}',
    };
    const pt = {
      'favorites.title': 'Favoritos',
      'favorite.add': 'Adicionar “{model}” aos favoritos',
      'favorite.remove': 'Remover “{model}” dos favoritos',
      'error.select': 'Não foi possível trocar o modelo: {message}',
    };

    return {
      inject: ['slots', 'modelDirectories', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en, ja, es, fr, de, ru, pt }), 'favorite-models: dictionaries');
        ctx.effect(() => {
          const onStorage = event => {
            if (event.key !== null && event.key !== STORAGE_KEY) return;
            reloadStored();
          };
          window.addEventListener('storage', onStorage);
          return () => { window.removeEventListener('storage', onStorage) };
        }, 'favorite-models: cross-window favourites');

        ctx.slots.inject('conversation.input.model.label', () => ctx.slots.register({
          name: 'conversation.input.model.label',
          locale: NS,
          inject: () => ({
            resolveText: text => ctx.locale.resolveText(text),
            toggleFavorite,
            hooks: { favorites: favoritesSource },
          }),
        }, ModelLabel));

        ctx.slots.inject('conversation.input.model.options', () => ctx.slots.register({
          name: 'conversation.input.model.options',
          id: 'favorite-models',
          order: -10,
          locale: NS,
          inject: sessionId => {
            const directory = ctx.modelDirectories.directoryFor(sessionId);
            return {
              tm: ctx.locale.bind('model'),
              toggleFavorite,
              select: selection => {
                try {
                  return directory.select(selection);
                } catch (error) {
                  return Promise.reject(error);
                }
              },
              hooks: {
                favorites: favoritesSource,
                models: directory.store,
              },
            };
          },
        }, FavoriteList));
      },
    };
  },
});
