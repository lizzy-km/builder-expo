import { View } from 'react-native';

import { AnimatedBlock } from '@/components/builder/animated-block';
import { WidgetBody } from '@/components/builder/widget-body';
import { childrenOf } from '@/lib/block-tree';
import { isLayoutType } from '@/lib/widget-kind';
import type { WidgetBlock } from '@/types/builder';

export type PreviewBlocksProps = {
  blocks: WidgetBlock[];
  parentId: string | null;
};

/**
 * Read-only recursive renderer: same widgets and animations as the canvas, but with no
 * drag handles, selection borders, or press targets.
 */
export function PreviewBlocks({ blocks, parentId }: PreviewBlocksProps) {
  return childrenOf(blocks, parentId).map((block) => (
    <View key={block.id} style={block.style}>
      <AnimatedBlock animation={block.animation}>
        <WidgetBody block={block}>
          {isLayoutType(block.type) ? (
            <PreviewBlocks blocks={blocks} parentId={block.id} />
          ) : undefined}
        </WidgetBody>
      </AnimatedBlock>
    </View>
  ));
}
