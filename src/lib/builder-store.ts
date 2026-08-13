/**
 * Builder canvas state. Holds the block list being edited plus the current selection.
 * Persistence lives in `pages-repository`; this store is purely in-memory editing state.
 */

import { create } from 'zustand';

import { cloneSubtree, extractSubtree, nextOrderIn } from '@/lib/block-clone';
import {
  childrenOf,
  moveWithinParent,
  normalizeSiblingOrder,
  removeSubtree,
} from '@/lib/block-tree';
import { sortByOrder } from '@/lib/reorder';
import { createWidgetBlock } from '@/lib/widget-defaults';
import { DEFAULT_ANIMATION, type AnimationProps } from '@/types/animation';
import type {
  BlockAttributes,
  StyleProps,
  WidgetBlock,
  WidgetPropsPatch,
  WidgetType,
} from '@/types/builder';

type BuilderState = {
  pageId: string | null;
  title: string;
  blocks: WidgetBlock[];
  selectedId: string | null;
  isDirty: boolean;
  isPublished: boolean;
};

type BuilderActions = {
  loadPage: (pageId: string, title: string, blocks: WidgetBlock[], isPublished: boolean) => void;
  setPublished: (isPublished: boolean) => void;
  reset: () => void;
  addWidget: (type: WidgetType, parentId?: string | null) => void;
  removeWidget: (id: string) => void;
  moveWidget: (parentId: string | null, from: number, to: number) => void;
  selectWidget: (id: string | null) => void;
  updateWidgetProps: (id: string, props: WidgetPropsPatch) => void;
  updateWidgetStyle: (id: string, style: Partial<StyleProps>) => void;
  updateWidgetAnimation: (id: string, animation: Partial<AnimationProps>) => void;
  updateWidgetAttributes: (id: string, attributes: Partial<BlockAttributes>) => void;
  /** Duplicate a block and its children as a new sibling. */
  duplicateWidget: (id: string) => void;
  /** Insert a saved sub template's blocks at the top level. */
  insertBlocks: (blocks: WidgetBlock[], parentId?: string | null) => void;
  markSaved: () => void;
};

/**
 * Merge a props patch into a block. The cast is needed because TypeScript can't tell
 * that `patch` belongs to this block's own widget type — callers are typed per-widget,
 * so the pairing is correct by construction at every call site.
 */
function applyPropsPatch(block: WidgetBlock, patch: WidgetPropsPatch): WidgetBlock {
  return { ...block, props: { ...block.props, ...patch } as WidgetBlock['props'] };
}

const INITIAL_STATE: BuilderState = {
  pageId: null,
  title: '',
  blocks: [],
  selectedId: null,
  isDirty: false,
  isPublished: false,
};

export const useBuilderStore = create<BuilderState & BuilderActions>((set) => ({
  ...INITIAL_STATE,

  loadPage: (pageId, title, blocks, isPublished) =>
    set({
      pageId,
      title,
      blocks: sortByOrder(blocks),
      selectedId: null,
      isDirty: false,
      isPublished,
    }),

  setPublished: (isPublished) => set({ isPublished }),

  reset: () => set(INITIAL_STATE),

  addWidget: (type, parentId = null) =>
    set((state) => {
      const siblingCount = childrenOf(state.blocks, parentId).length;
      const block = createWidgetBlock(type, siblingCount, parentId);
      return { blocks: [...state.blocks, block], selectedId: block.id, isDirty: true };
    }),

  removeWidget: (id) =>
    set((state) => ({
      blocks: normalizeSiblingOrder(removeSubtree(state.blocks, id)),
      selectedId: state.selectedId === id ? null : state.selectedId,
      isDirty: true,
    })),

  moveWidget: (parentId, from, to) =>
    set((state) => ({
      blocks: moveWithinParent(state.blocks, parentId, from, to),
      isDirty: true,
    })),

  selectWidget: (id) => set({ selectedId: id }),

  updateWidgetProps: (id, props) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? applyPropsPatch(block, props) : block,
      ),
      isDirty: true,
    })),

  updateWidgetStyle: (id, style) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, style: { ...block.style, ...style } } : block,
      ),
      isDirty: true,
    })),

  updateWidgetAnimation: (id, animation) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id
          ? { ...block, animation: { ...DEFAULT_ANIMATION, ...block.animation, ...animation } }
          : block,
      ),
      isDirty: true,
    })),

  updateWidgetAttributes: (id, attributes) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id
          ? { ...block, attributes: { ...block.attributes, ...attributes } }
          : block,
      ),
      isDirty: true,
    })),

  duplicateWidget: (id) =>
    set((state) => {
      const source = state.blocks.find((block) => block.id === id);
      if (!source) return state;

      const subtree = extractSubtree(state.blocks, id);
      const copies = cloneSubtree(
        subtree,
        id,
        source.parentId,
        nextOrderIn(state.blocks, source.parentId),
      );
      return {
        blocks: normalizeSiblingOrder([...state.blocks, ...copies]),
        selectedId: copies.find((block) => block.parentId === source.parentId)?.id ?? null,
        isDirty: true,
      };
    }),

  insertBlocks: (blocks, parentId = null) =>
    set((state) => {
      const root = blocks.find((block) => block.parentId === null);
      if (!root) return state;

      const copies = cloneSubtree(blocks, root.id, parentId, nextOrderIn(state.blocks, parentId));
      return {
        blocks: normalizeSiblingOrder([...state.blocks, ...copies]),
        selectedId: copies.find((block) => block.parentId === parentId)?.id ?? null,
        isDirty: true,
      };
    }),

  markSaved: () => set({ isDirty: false }),
}));
