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
  menu: Array<string | LinkObject>
}

interface LinkObject {
  text: string
  link: string
}

const MobileSubmenu: StorefrontFunctionComponent<MobileSubmenuProps> = ({ children, mainMenu }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<any>();
  const [subLevelOne, setSubLevelOne] = useState<Boolean>(true);
  const [menuTitle, setMenuTitle] = useState<string>(mainMenu.title);
  const [menuTitleLink, setMenuTitleLink] = useState<string>(mainMenu.titleLink);

  const handleClickMain = (e: any) => {
    const clicked = e.currentTarget;
    const childToLoad = clicked.dataset.mainmenuitem;
    const directLink = clicked.dataset.directlink;

    if (directLink === "false") {
      // @ts-expect-error
      setActiveSubmenu(children[childToLoad]);
      setSubLevelOne(false);
      setMenuTitle(mainMenu.title);
    } else {
      // @ts-expect-error
      document.location = directLink;
    }
  }

  const handleBackToMain = () => {
    setSubLevelOne(true);
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
                  <div key={(typeof item === "string") ? `${index}_${item}` : `${index}_${item.text}`} onClick={handleClickMain} data-directlink={item.link ? item.link : "false"} data-mainmenuitem={index} className={styles.mobileMainMenuItemContainer}>
                    <div className={styles.mobileMainMenuItemWrapper}>
                      <div className={item.link ? styles.mobileMainMenuItemLink : styles.mobileMainMenuItem}>
                        {(typeof item === "string") ? item : item.text}
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
  title: 'Mobile Sub Menu',
  description: 'editor.mobilesubmenu.description',
  type: 'object',
  properties: {
    mainMenu: {
      type: "object",
      title: "Sub Menu",
      properties: {
        title: {
          type: "string",
          title: "Sub Menu Title"
        },
        titleLink: {
          title: "Title Link",
          description: "Link to 'All' products",
          type: "string"
        },
        menu: {
          title: "Menu List",
          description: "Do not change the order of these items.",
          type: "array",
          items: {
            properties: {
              __editorItemTitle: {
                title: "Site Editor Item Title",
                desciption: "Only visible in Site Editor",
                type: "string",
              },
              text: {
                title: "Menu Item Text",
                type: "string",
              },
              link: {
                title: "Menu Item Link",
                description: "Only used if menu item has no submenu.",
                type: "string"
              }
            }
          }
        }
      }
    }
  }
}

export default MobileSubmenu;