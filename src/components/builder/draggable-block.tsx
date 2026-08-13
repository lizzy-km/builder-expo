import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { shiftForRow, targetIndexFor } from '@/lib/drag-math';

export type DraggableBlockProps = PropsWithChildren<{
  index: number;
  /** Total rows on the canvas, used to clamp the drag target. */
  total: number;
  rowHeight: number;
  /** Index of the row currently being dragged, or -1 when idle. */
  activeIndex: SharedValue<number>;
  /** Index the dragged row would land on, or -1 when idle. */
  targetIndex: SharedValue<number>;
  isSelected: boolean;
  onSelect: () => void;
  onDragEnd: (from: number, to: number) => void;
  onMeasure: (height: number) => void;
  /** The block's own sizing/spacing box, applied here so widgets don't fight it. */
  boxStyle?: StyleProp<ViewStyle>;
}>;

const LONG_PRESS_MS = 200;

export function DraggableBlock({
  index,
  total,
  rowHeight,
  activeIndex,
  targetIndex,
  isSelected,
  onSelect,
  onDragEnd,
  onMeasure,
  boxStyle,
  children,
}: DraggableBlockProps) {
  const theme = useTheme();
  const translationY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const pan = Gesture.Pan()
    .activateAfterLongPress(LONG_PRESS_MS)
    .onStart(() => {
      isDragging.value = true;
      activeIndex.value = index;
      targetIndex.value = index;
    })
    .onUpdate((event) => {
      translationY.value = event.translationY;
      targetIndex.value = targetIndexFor(index, event.translationY, rowHeight, total);
    })
    .onEnd(() => {
      const to = targetIndex.value;
      scheduleOnRN(onDragEnd, index, to);
    })
    .onFinalize(() => {
      isDragging.value = false;
      activeIndex.value = -1;
      targetIndex.value = -1;
      translationY.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => {
    if (isDragging.value) {
      return {
        transform: [{ translateY: translationY.value }, { scale: 1.02 }],
        zIndex: 20,
        opacity: 0.95,
      };
    }
    const shift = shiftForRow(index, activeIndex.value, targetIndex.value, rowHeight);
    return {
      transform: [{ translateY: withSpring(shift, { damping: 20 }) }, { scale: 1 }],
      zIndex: 0,
      opacity: 1,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={animatedStyle}
        onLayout={(event) => onMeasure(event.nativeEvent.layout.height)}
      >
        <Pressable
          onPress={onSelect}
          style={[
            styles.row,
            boxStyle,
            { borderColor: isSelected ? theme.primary : 'transparent' },
            isSelected && styles.selected,
          ]}
        >
          {children}
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  row: {
    borderWidth: 2,
    borderRadius: Spacing.two,
  },
  selected: {
    borderStyle: 'solid',
  },
});
