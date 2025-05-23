import React, { HTMLAttributes, useEffect, useState } from 'react';
import { isEqual, omit } from '@util/index';
import { getClassName } from './AccordionGroupStyles';

import Accordion, { AccordionProps } from './Accordion';

export interface AccordionGroupProps extends HTMLAttributes<any> {
  items: AccordionProps[];
  onOpen?: (index: number) => void;
  selectedProps?: AccordionProps;
  type?: 'single' | 'multi';
}

const omitValues = ['items', 'onOpen', 'selectedProps', 'type'];

/**
 * AccordionGroup component for displaying multiple accordions in a group.
 * Set the 'type' prop to 'single' (default) to only have one accordion open at a time.
 * Set it to 'multi' to have multiple accordions open at a time.
 * @param props AccordionGroupProps
 */
export function AccordionGroup(props: AccordionGroupProps) {
  const [accordions, setAccordions] = useState<AccordionProps[]>(buildItems());
  const [initialItems, setInitialItems] = useState(props.items);

  const type = props.type || 'single';

  useEffect(() => {
    if (!isEqual(initialItems, props.items)) {
      setAccordions(buildItems());
    }
  }, [props.items]);

  function buildItems() {
    return (
      props.items?.map((item) => {
        return {
          ...item,
          preventAutoOpen: true
        };
      }) || []
    );
  }

  function onClickGroup(e, item, index) {
    if (type === 'single') {
      const newAccordions = [...accordions];
      newAccordions?.forEach((newItem, newItemIndex) => {
        if (newItemIndex === index && !newItem.open) {
          newAccordions[newItemIndex] = {
            ...newItem,
            ...(props.selectedProps || {}),
            open: !newItem.open
          };
        } else {
          newAccordions[newItemIndex] = {
            ...props.items[newItemIndex],
            preventAutoOpen: true,
            open: false
          };
        }
      });
      setAccordions(newAccordions);
    } else {
      const newAccordions = [...accordions];
      if (newAccordions[index].open) {
        newAccordions[index] = {
          ...props.items[index],
          preventAutoOpen: true,
          open: false
        };
      } else {
        newAccordions[index] = {
          ...newAccordions[index],
          ...(props.selectedProps || {}),
          open: true
        };
      }

      setAccordions(newAccordions);
    }

    item.onClick?.(e);
    props.onOpen?.(index);
  }

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-accordion-group',
        props,
        custom: props.className
      })}
      style={props.style}
    >
      {accordions.map((item, index) => {
        const key = `finallyreact-accordion-group-index-${index}`;

        return (
          <Accordion
            key={key}
            {...item}
            onClick={(e) => {
              onClickGroup(e, item, index);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClickGroup(e, item, index);
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default AccordionGroup;
