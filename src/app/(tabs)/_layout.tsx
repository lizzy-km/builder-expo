import AppTabs from '@/components/app-tabs';

/**
 * Tab navigator for the three top-level screens. Routes outside this group (the builder
 * and public page views) are pushed over the tabs by the root stack.
 */
export default function TabsLayout() {
  return <AppTabs />;
}
