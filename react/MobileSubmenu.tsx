import React, { ReactChildren, useRef } from 'react';
import { useEffect, useState } from 'react';

// Styles
import styles from "./styles.css";

interface MobileSubmenuProps {
  children: ReactChildren
}

const MobileSubmenu: StorefrontFunctionComponent<MobileSubmenuProps> = ({ }) => {
  useEffect(() => {
    // console.clear();
  })

  return (
    <h2>Hello Mobile Submenu!</h2>
  )
}

MobileSubmenu.schema = {
  title: 'editor.mobilesubmenu.title',
  description: 'editor.mobilesubmenu.description',
  type: 'object',
  properties: {}
}

export default MobileSubmenu;