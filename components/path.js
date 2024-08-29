import { SIDENAV_ITEMS } from "@/constants";

export function getTitleOfPath(flowerType, flowerSubType, nestedSubMenuType) {
  let title = "";
  let subTitle = "";
  let nestedSubTitle = "";

  function findTitles(menuItems) {
    for (const item of menuItems) {
      if (item.path === flowerType) {
        title = item.title;

        if (item.submenu && item.subMenuItems) {
          for (const subItem of item.subMenuItems) {
            if (subItem.path === flowerSubType) {
              subTitle = subItem.title;
              if (subItem.subMenuItemsMenu) {
                for (const nestedSubItem of subItem.subMenuItemsMenu) {
                  if (nestedSubItem.path === nestedSubMenuType) {
                    nestedSubTitle = nestedSubItem.title;
                  }
                }
              }
            }
          }
        }
        if (item.subMenuItemsMenu) {
          for (const subItem of item.subMenuItemsMenu) {
            if (subItem.path === flowerSubType) {
              subTitle = subItem.title;
              if (subItem.subMenuItemsMenu) {
                for (const nestedSubItem of subItem.subMenuItemsMenu) {
                  if (nestedSubItem.path === nestedSubMenuType) {
                    nestedSubTitle = nestedSubItem.title;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  findTitles(SIDENAV_ITEMS);

  subTitle = subTitle || "Unknown Subtype";
  nestedSubTitle = nestedSubTitle || "Unknown Nested Subtype";

  return { title, subTitle, nestedSubTitle };
}
