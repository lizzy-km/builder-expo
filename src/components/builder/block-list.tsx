import { StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { AnimatedBlock } from '@/components/builder/animated-block';
import { DraggableBlock } from '@/components/builder/draggable-block';
import { WidgetBody } from '@/components/builder/widget-body';
import { childrenOf } from '@/lib/block-tree';
import { isLayoutType } from '@/lib/widget-kind';
import type { WidgetBlock } from '@/types/builder';

export type BlockListProps = {
  blocks: WidgetBlock[];
  parentId: string | null;
  selectedId: string | null;
  rowHeight: number;
  /** Bumped by the toolbar's replay button to re-run every entrance animation. */
  replayKey: number;
  onSelect: (id: string) => void;
  onReorder: (parentId: string | null, from: number, to: number) => void;
  onMeasure: (height: number) => void;
};

/**
 * Renders one sibling group, recursing into layout widgets so nested children appear
 * inside their parent. Each group owns its own drag state, so dragging inside a nested
 * container doesn't shift rows in the group above it.
 */
export function BlockList({
  blocks,
  parentId,
  selectedId,
  rowHeight,
  replayKey,
  onSelect,
  onReorder,
  onMeasure,
}: BlockListProps) {
  const activeIndex = useSharedValue(-1);
  const targetIndex = useSharedValue(-1);
  const siblings = childrenOf(blocks, parentId);

  return siblings.map((block, index) => (
    <DraggableBlock
      key={block.id}
      index={index}
      total={siblings.length}
      rowHeight={rowHeight}
      activeIndex={activeIndex}
      targetIndex={targetIndex}
      isSelected={block.id === selectedId}
      onSelect={() => onSelect(block.id)}
      onDragEnd={(from, to) => onReorder(parentId, from, to)}
      onMeasure={onMeasure}
      boxStyle={[block.style, block.attributes?.hidden && styles.hidden]}
    >
      <AnimatedBlock animation={block.animation} replayKey={replayKey}>
        <WidgetBody block={block}>
          {isLayoutType(block.type) ? (
            <BlockList
              blocks={blocks}
              parentId={block.id}
              selectedId={selectedId}
              rowHeight={rowHeight}
              replayKey={replayKey}
              onSelect={onSelect}
              onReorder={onReorder}
              onMeasure={onMeasure}
            />
          ) : undefined}
        </WidgetBody>
      </AnimatedBlock>
    </DraggableBlock>
  ));
}

const styles = StyleSheet.create({
  /** Hidden blocks stay on the canvas, dimmed, so they can be selected and un-hidden. */
  hidden: {
    opacity: 0.4,
  },
});
