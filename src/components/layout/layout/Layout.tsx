import React, { HTMLAttributes } from 'react';
import { omit, useWindowSize } from '@util/index';

import Navbar, { NavbarProps } from '../navbar/Navbar';
import Sidenav, { SidenavProps } from '../sidenav/Sidenav';
import { getClassName } from './LayoutStyles';

export interface LayoutProps extends HTMLAttributes<any> {
  contentProps?: HTMLAttributes<any>;
  fullHeight?: boolean;
  navbarProps?: NavbarProps;
  showNavbar?: boolean;
  showSidenav?: boolean;
  sidenavProps?: SidenavProps;
  footerProps?: HTMLAttributes<any>;
  footer?: any;
}

const omitValues = ['contentProps', 'fullHeight', 'navbarProps', 'showNavbar', 'showSidenav', 'sidenavProps'];

/**
 * Layout component for easily creating an app layout with navbar, sidenav and footer.
 * @param props LayoutProps
 */
export function Layout(props: LayoutProps) {
  const [windowWidth, windowHeight, screenSize, isMobile] = useWindowSize();

  const content = (
    <div
      {...(props.contentProps || {})}
      className={getClassName({
        name: 'finallyreact-layout__layout-content',
        props,
        withNavbar: !!(props.showNavbar && props.navbarProps?.sticky),
        withNavbarFull: props.fullHeight,
        custom: props.contentProps?.className,
        isMobile
      })}
    >
      {props.children}
    </div>
  );

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-layout',
        props,
        custom: props.className
      })}
    >
      {props.showNavbar && (
        <Navbar {...props.navbarProps} withSidenav={props.showSidenav && props.navbarProps?.sticky} />
      )}

      {props.showSidenav ? (
        <div
          {...(props.contentProps || {})}
          className={getClassName({
            name: 'finallyreact-layout__content-with-sidenav',
            props,
            sideNavFull: props.fullHeight,
            custom: props.contentProps?.className
          })}
        >
          <Sidenav {...props.sidenavProps} withNavbar={props.showNavbar && props.navbarProps?.sticky} />
          {content}
        </div>
      ) : (
        content
      )}

      {props.footer && (
        <div
          {...(props.footerProps || {})}
          className={getClassName({
            name: 'finallyreact-layout__footer',
            props,
            custom: props.footerProps?.className
          })}
        >
          {props.footer}
        </div>
      )}
    </div>
  );
}

export default Layout;
