/**
 * Builder canvas state. Holds the block list being edited plus the current selection.
 * Persistence lives in `pages-repository`; this store is purely in-memory editing state.
 */

import { create } from 'zustand';

import {
  childrenOf,
  moveWithinParent,
  normalizeSiblingOrder,
  removeSubtree,
} from '@/lib/block-tree';
import { sortByOrder } from '@/lib/reorder';
import { createWidgetBlock } from '@/lib/widget-defaults';
import { DEFAULT_ANIMATION, type AnimationProps } from '@/types/animation';
import type { StyleProps, WidgetBlock, WidgetPropsPatch, WidgetType } from '@/types/builder';

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

  markSaved: () => set({ isDirty: false }),
}));
