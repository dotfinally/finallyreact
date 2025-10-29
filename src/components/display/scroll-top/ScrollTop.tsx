import React, { useEffect, useState, HTMLAttributes, useMemo } from 'react';
import { classnames, omit, getFinallyConfig, useWindowSize } from '@util/index';
import { UpCircleIcon } from '@icons/UpCircleIcon';
import { getClassName } from './ScrollTopStyles';

export interface ScrollTopProps extends HTMLAttributes<any> {
  /**
   * id of the scrollable element to watch and to scroll.
   * If omitted, window/documentElement will be used.
   */
  targetId?: string;
  /** thresholdPixels in pixels after which the button appears (default 100) */
  thresholdPixels?: number;
  /** accessible label (defaults to "Scroll to top") */
  label?: string;
  /** custom button children (e.g., icon). If omitted a simple arrow is rendered. */
  children?: React.ReactNode;
  simple?: boolean;
  color?: string;
}

const omitValues = ['targetId', 'thresholdPixels', 'label', 'children', 'simple', 'color'];

export function ScrollTop(props: ScrollTopProps) {
  const {
    targetId,
    thresholdPixels = 100,
    label = 'Scroll to top',
    children,
    className,
    tabIndex,
    role,
    color,
    ...rest
  } = props;

  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [visible, setVisible] = useState<boolean>(false);
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
  const [isHover, setIsHover] = useState<boolean>(false);

  console.log({ visible, targetEl, isHover });

  useEffect(() => {
    const el = targetId
      ? document.getElementById(targetId)
      : (document.scrollingElement as HTMLElement) || document.documentElement;
    console.log({ el });
    setTargetEl(el || null);

    const onScroll = () => {
      const scrollTop = el ? el.scrollTop : window.pageYOffset || document.documentElement.scrollTop || 0;
      console.log('onScroll', { scrollTop, thresholdPixels });
      setVisible(scrollTop > thresholdPixels);
    };

    // Use passive listeners when listening to window/element scroll
    if (el) {
      el.addEventListener('scroll', onScroll, { passive: true });
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // initial check
    onScroll();

    return () => {
      if (el) {
        el.removeEventListener('scroll', onScroll);
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [targetId, thresholdPixels]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = targetEl || (document.scrollingElement as HTMLElement) || document.documentElement;
    if (el === document.documentElement) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      {...omit(rest, omitValues)}
      className={getClassName({
        name: 'finallyreact-scroll-top',
        props,
        simple,
        custom: className,
        visible: visible,
        isHover
      })}
      onClick={handleClick}
      role={role ?? 'button'}
      aria-label={props['aria-label'] ?? label}
      aria-hidden={visible}
      tabIndex={tabIndex ?? 0}
      title={label}
      type="button"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
    >
      <div className="finallyreact-scroll-top__inner" aria-hidden={visible}>
        {children ?? <UpCircleIcon color={color || 'stone-10'} />}
      </div>
    </div>
  );
}

export default ScrollTop;
