// @ts-ignore
import React, { useCallback, useState, useEffect } from 'react';

import './index.css';

interface MenuProps {
  menu: Array<{
    name: string;
    onClick: (event: MouseEvent) => void;
  }>;

  // whether to use custom context menu
  shouldCustomContextMenu?: boolean;
}

const useContextMenu = (shouldCustomContextMenu = true) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {

      const element = (e.target as HTMLElement);

      if (element.children.length == 0)  {
        setShowMenu(false);

        return;
      }

      setMenuStyle(getMenuStyle(e, 110, 90));

      setShowMenu(true);
      e.preventDefault();
    },
    [setShowMenu]
  );

  const getMenuStyle = (e: MouseEvent, menuWidth: number, menuHeight: number) => {
    let left = e.pageX;
    let top = e.pageY;
    const docElem = document.documentElement;
    const clientWidth = docElem.clientWidth;

    if (left + menuWidth - window.scrollX >= clientWidth) {
      left = Math.max(left - menuWidth, window.scrollX + 1);
    }
    if (top + menuHeight - window.scrollY >= docElem.clientHeight - 25) {
      top = Math.max(top - menuHeight, window.scrollY + 1);
    }

    return { top, left, marginRight: clientWidth - left };
  };

  const handleClick = useCallback(() => {
    if (showMenu) {
      setShowMenu(false);
    }
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    shouldCustomContextMenu && document.addEventListener('contextmenu', handleContextMenu);
  
    return () => {
      document.addEventListener('click', handleClick);
      shouldCustomContextMenu && document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return { showMenu, menuStyle };
};

const ContextMenu = ({ menu, shouldCustomContextMenu }: MenuProps) => {
  const { showMenu, menuStyle } = useContextMenu(shouldCustomContextMenu);
  const list = menu || [];

  return (
    <>
      {showMenu ? (
        <div
          className='w-context-menu'
          style={menuStyle}
        >
          <ul className='w-ctx-menu-list'>
            {(list as Array<any>).map(item => (
              <li 
                className='w-ctx-menu-item'
                key={item.name}
                onClick={item.onClick}
                onContextMenu={item.onClick}
              >
                <label className='w-ctx-item-tt w-ctx-selected'>
                  {item.name}
                </label>
              </li>
            ))
            }
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ContextMenu;
