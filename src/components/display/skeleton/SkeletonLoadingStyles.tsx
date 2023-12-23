import { SkeletonLoadingProps } from './SkeletonLoading';
import { filterClassName } from '@util/helpers/classFilter';

export function getClassName({
  name,
  props,
  simple,
  custom
}: {
  name: string;
  props: SkeletonLoadingProps;
  simple: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-skeleton-loading') {
    value += ' w-full h-4'
  }

  if (simple) {
    value += ' simple';
  }

  return filterClassName(value, custom);
}
