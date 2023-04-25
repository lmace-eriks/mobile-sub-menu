import React, { ReactChildren, useRef, useEffect, useState } from 'react';
import { canUseDOM } from 'vtex.render-runtime';

// Styles
import styles from "./styles.css";

interface MobileSubmenuProps {
  mainMenu: MainMenuObject
  highlights?: Array<LinkObject>
  children: ReactChildren | any
}

interface MainMenuObject {
  title: string
  titleLink: string
  menu: Array<LinkObject>
}

interface LinkObject {
  text: string
  link: string
  bgColor: string
  textColor: string
}

const noDirectLinkFlag = "none";
const spinnerSolo = `<svg style="margin-left: auto;" class="eriksbikeshop-headersubmenu-1-x-spinner" width="50px" height="50px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2624 5.40607L13.8714 4.42848C13.6471 3.86771 13.104 3.5 12.5 3.5C11.896 3.5 11.3529 3.86771 11.1286 4.42848L10.7376 5.40607C10.5857 5.78585 10.2869 6.08826 9.90901 6.2448C9.53111 6.40133 9.10603 6.39874 8.73006 6.23761L7.76229 5.82285C7.20716 5.58494 6.56311 5.70897 6.13604 6.13604C5.70897 6.56311 5.58494 7.20716 5.82285 7.76229L6.23761 8.73006C6.39874 9.10602 6.40133 9.53111 6.2448 9.90901C6.08826 10.2869 5.78585 10.5857 5.40607 10.7376L4.42848 11.1286C3.86771 11.3529 3.5 11.896 3.5 12.5C3.5 13.104 3.86771 13.6471 4.42848 13.8714L5.40607 14.2624C5.78585 14.4143 6.08826 14.7131 6.2448 15.091C6.40133 15.4689 6.39874 15.894 6.23761 16.2699L5.82285 17.2377C5.58494 17.7928 5.70897 18.4369 6.13604 18.864C6.56311 19.291 7.20716 19.4151 7.76229 19.1772L8.73006 18.7624C9.10603 18.6013 9.53111 18.5987 9.90901 18.7552C10.2869 18.9117 10.5857 19.2141 10.7376 19.5939L11.1286 20.5715C11.3529 21.1323 11.896 21.5 12.5 21.5C13.104 21.5 13.6471 21.1323 13.8714 20.5715L14.2624 19.5939C14.4143 19.2141 14.7131 18.9117 15.091 18.7552C15.4689 18.5987 15.894 18.6013 16.2699 18.7624L17.2377 19.1771C17.7928 19.4151 18.4369 19.291 18.864 18.864C19.291 18.4369 19.4151 17.7928 19.1771 17.2377L18.7624 16.2699C18.6013 15.894 18.5987 15.4689 18.7552 15.091C18.9117 14.7131 19.2141 14.4143 19.5939 14.2624L20.5715 13.8714C21.1323 13.6471 21.5 13.104 21.5 12.5C21.5 11.896 21.1323 11.3529 20.5715 11.1286L19.5939 10.7376C19.2141 10.5857 18.9117 10.2869 18.7552 9.90901C18.5987 9.53111 18.6013 9.10602 18.7624 8.73006L19.1772 7.76229C19.4151 7.20716 19.291 6.56311 18.864 6.13604C18.4369 5.70897 17.7928 5.58494 17.2377 5.82285L16.2699 6.23761C15.894 6.39874 15.4689 6.40133 15.091 6.2448C14.7131 6.08826 14.4143 5.78585 14.2624 5.40607Z" stroke="#121923" stroke-width="1.2"/><path d="M16.5 12.5C16.5 14.7091 14.7091 16.5 12.5 16.5C10.2909 16.5 8.5 14.7091 8.5 12.5C8.5 10.2909 10.2909 8.5 12.5 8.5C14.7091 8.5 16.5 10.2909 16.5 12.5Z" stroke="#121923" stroke-width="1.2"/></svg>`;
const spinnerWithText = `Loading...${spinnerSolo}`;

const MobileSubmenu: StorefrontFunctionComponent<MobileSubmenuProps> = ({ children, mainMenu, highlights }) => {
  const [hasHighlights, setHasHighlights] = useState<Boolean>(!!highlights?.length);
  const [activeSubmenu, setActiveSubmenu] = useState<any>();
  const [levelOneView, setLevelOneView] = useState<Boolean>(true);
  const [menuTitle, setMenuTitle] = useState<string>(mainMenu.title);
  const [menuTitleLink, setMenuTitleLink] = useState<string>(mainMenu.titleLink);

  const handleClickMain = (e: any) => {
    const clicked = e.currentTarget;
    const directLink = clicked.dataset.directlink;

    if (directLink !== noDirectLinkFlag) {
      addSpinnerAndNavigate(directLink, clicked);
      return;
    }

    const childToLoad = clicked.dataset.mainmenuitem;

    setActiveSubmenu(children[childToLoad]);
    setLevelOneView(false);
    setMenuTitle(mainMenu.title);
  }

  const addSpinnerAndNavigate = (directLink: string, target: any) => {
    if (!canUseDOM) return;

    target.innerHTML = spinnerWithText;
    // Timout for Safari Bug - LM
    setTimeout(() => { document.location.href = directLink; }, 1);
  }

  const handleBackToMain = () => {
    setLevelOneView(true);
  }

  const HighlightList = () => (<>
    {highlights?.map((item, index) => (
      <button key={`item-${index}`}
        onClick={handleClickMain}
        data-directlink={item.link ? item.link : noDirectLinkFlag}
        data-mainmenuitem={index}
        style={{ backgroundColor: item.bgColor ? item.bgColor : "", color: item.textColor ? item.textColor : "" }}
        className={`${styles.mobileMainMenuItemButton} ${item.link ? styles.arrow : styles.plus}`}>
        {item.text}
      </button>
    ))}
  </>);

  const LevelOneLayout = () => (
    <nav className={styles.mobileNav}>
      {menuTitle !== "Main" && <div className={styles.submenuTitle}>{menuTitle} Menu</div>}
      {hasHighlights && <HighlightList />}
      {mainMenu.menu.map((item, index) => (
        <button key={`item-${index}`} onClick={handleClickMain} data-directlink={item.link ? item.link : noDirectLinkFlag} data-mainmenuitem={index} style={item.bgColor ? { backgroundColor: `${item.bgColor}` } : {}} className={`${styles.mobileMainMenuItemButton} ${item.link ? styles.arrow : styles.plus}`}>
          {item.text}
        </button>
      ))}
    </nav>
  );

  const SubLevelLayout = () => (<>
    <div className={styles.backToButtonContainer}>
      <button onClick={handleBackToMain} className={styles.backToMenuButton}>◀ Back To {menuTitle}</button>
    </div>
    {activeSubmenu}
  </>);

  return (<>
    {levelOneView && <LevelOneLayout />}
    {!levelOneView && <SubLevelLayout />}
  </>)
}

MobileSubmenu.schema = {
  title: "Mobile Sub Menu",
  description: "",
  type: "object",
  properties: {
    mainMenu: {
      type: "object",
      title: "Sub Menu",
      properties: {
        title: {
          type: "string",
          title: "REQUIRED | Sub Menu Title."
        },
        titleLink: {
          title: "Title Link",
          description: "Link to 'All' products. Leave blank if not desired.",
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
                desciption: "Only visible in Site Editor.",
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
              },
              bgColor: {
                title: "Background Color",
                description: "Any string CSS color value. Example: rgba(0, 255, 0, 0.75)",
                type: "string"
              }
            }
          }
        }
      }
    },
    highlights: {
      title: "Highlights",
      type: "array",
      items: {
        properties: {
          __editorItemTitle: {
            title: "Site Editor Item Title",
            desciption: "Only visible in Site Editor.",
            type: "string",
          },
          text: {
            title: "Text",
            description: "Displayed Text.",
            type: "string"
          },
          link: {
            title: "Link",
            description: "Absolute or Relative URL path to destination.",
            type: "string"
          },
          bgColor: {
            title: "Background Color",
            description: "Hexidecimal, RGB or Color Name.",
            type: "string"
          },
          textColor: {
            title: "Text Color",
            description: "Hexidecimal, RGB or Color Name.",
            type: "string"
          }
        }
      }
    }
  }
}

export default MobileSubmenu;
