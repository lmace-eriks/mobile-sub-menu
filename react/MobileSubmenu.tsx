import React, { ReactChildren, useRef } from 'react';
import { useEffect, useState } from 'react';

// Styles
import styles from "./styles.css";

interface MobileSubmenuProps {
  mainMenu: MainMenuObject
  children: ReactChildren
}

interface MainMenuObject {
  title: string
  titleLink: string
  menu: Array<string>
}

const MobileSubmenu: StorefrontFunctionComponent<MobileSubmenuProps> = ({ children, mainMenu }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<any>();
  const [subLevelOne, setSubLevelOne] = useState<Boolean>(true);
  const [menuTitle, setMenuTitle] = useState<string>(mainMenu.title);
  const [menuTitleLink, setMenuTitleLink] = useState<string>(mainMenu.titleLink);
  const [subMenuTitle, setSubMenuTitle] = useState<string>("");

  const handleClickMain = (e: any) => {
    console.clear();
    const clicked = e.currentTarget;

    const childToLoad = clicked.dataset.mainmenuitem;

    // @ts-expect-error
    setActiveSubmenu(children[childToLoad]);
    setSubLevelOne(false);
    setMenuTitle(mainMenu.title);
    setSubMenuTitle(mainMenu.menu[childToLoad]);
  }

  const handleBackToMain = () => {
    setSubLevelOne(true);
    console.log("Back")
  }

  return (
    <>
      {subLevelOne &&
        <div className={styles.mobileSubmenuContainer}>
          <div className={styles.mobileSubmenuWrapper}>
            {menuTitle !== "Main" ? <div className={styles.mobileMenuTitle}><a href={menuTitleLink} className={styles.mobileMenuTitleLink}>All {menuTitle}</a></div> : ""}
            <nav className={styles.mobileNav}>
              {
                mainMenu.menu.map((item, index) => (
                  <div key={`${index}_${item}`} onClick={handleClickMain} data-mainmenuitem={index} className={styles.mobileMainMenuItemContainer}>
                    <div className={styles.mobileMainMenuItemWrapper}>
                      <div className={styles.mobileMainMenuItem}>
                        {item}
                      </div>
                    </div>
                  </div>
                ))
              }
            </nav>
          </div>
        </div>
      }

      {!subLevelOne &&
        <>
          <div className={styles.backToButtonContainer}>
            <div className={styles.backToButtonWrapper}>
              <div onClick={handleBackToMain} className={styles.backToMenuButton}>◀ Back To {menuTitle}</div>
            </div>
          </div>
          {activeSubmenu}
        </>}
    </>
  )
}

MobileSubmenu.schema = {
  title: 'editor.mobilesubmenu.title',
  description: 'editor.mobilesubmenu.description',
  type: 'object',
  properties: {}
}

export default MobileSubmenu;