import React, { HTMLAttributes, useMemo, useState } from 'react';
import { getFinallyConfig, omit } from '@util/index';
import { getClassName } from './CarouselStyles';
import { LeftIcon } from '@icons/LeftIcon';
import { RightIcon } from '@icons/RightIcon';

export interface CarouselProps extends HTMLAttributes<any> {
  items: any[];
  simple?: boolean;
  leftArrowProps?: HTMLAttributes<any>;
  rightArrowProps?: HTMLAttributes<any>;
  customLeftArrow?: React.ReactNode;
  customRightArrow?: React.ReactNode;
  contentProps?: HTMLAttributes<any>;
  itemsToShow?: number;
}

const omitValues = [
  'items',
  'simple',
  'leftArrowProps',
  'rightArrowProps',
  'customLeftArrow',
  'customRightArrow',
  'contentProps',
  'itemsToShow'
];

export function Carousel(props: CarouselProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [currentIndex, setCurrentIndex] = useState(0);
  const length = props.items?.length || 0;

  const isLeftArrowDisabled = currentIndex === 0;
  const isRightArrowDisabled = currentIndex + (props.itemsToShow || 1) >= length;

  const itemsToShow = props.itemsToShow || 1;

  const handleLeftArrowClick = (e: any) => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);

    e.newIndex = newIndex;
    props.leftArrowProps?.onClick?.(e);
  };

  const handleRightArrowClick = (e: any) => {
    const newIndex = Math.min(currentIndex + 1, length - itemsToShow);
    setCurrentIndex(newIndex);

    e.newIndex = newIndex;
    props.rightArrowProps?.onClick?.(e);
  };

  if (!props.items || props.items.length === 0) {
    return null;
  }

  const displayedItems = props.items.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-carousel_container',
        props,
        simple,
        custom: props.className
      })}
    >
      {props.customLeftArrow ? (
        <div
          tabIndex={0}
          onClick={handleLeftArrowClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLeftArrowClick(e);
            }
          }}
        >
          {props.customLeftArrow}
        </div>
      ) : (
        <LeftIcon
          {...(props.leftArrowProps || {})}
          aria-label={props.leftArrowProps?.['aria-label'] || isLeftArrowDisabled ? 'Left Arrow Disabled' : 'Left Arrow'}
          onClick={handleLeftArrowClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLeftArrowClick(e);
            }
          }}
          className={getClassName({
            name: 'finallyreact-carousel_arrow-left',
            props,
            simple,
            arrowDisabled: isLeftArrowDisabled,
            custom: props.leftArrowProps?.className
          })}
        />
      )}

      <div
        {...(props.contentProps || {})}
        tabIndex={props.contentProps?.tabIndex || 0}
        className={getClassName({
          name: 'finallyreact-carousel_content-container',
          props,
          simple,
          custom: props.contentProps?.className
        })}
      >
        {displayedItems.map((item, index) => (
          <div key={`carousel-item-${index}`}>{item}</div>
        ))}
      </div>

      {props.customRightArrow ? (
        <div
          tabIndex={0}
          onClick={handleRightArrowClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleRightArrowClick(e);
            }
          }}
        >
          {props.customRightArrow}
        </div>
      ) : (
        <RightIcon
          {...(props.rightArrowProps || {})}
          aria-label={props.rightArrowProps?.['aria-label'] || isRightArrowDisabled ? 'Right Arrow Disabled' : 'Right Arrow'}
          onClick={handleRightArrowClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleRightArrowClick(e);
            }
          }}
          className={getClassName({
            name: 'finallyreact-carousel_arrow-right',
            props,
            simple,
            arrowDisabled: isRightArrowDisabled,
            custom: props.rightArrowProps?.className
          })}
        />
      )}
    </div>
  );
}

export default Carousel;
