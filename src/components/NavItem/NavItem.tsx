interface NavItemProps {
  title: string;
  navItemId: string;
}

function NavItem({ title, navItemId }: NavItemProps) {
  return (
        <li>
            <a href={navItemId}>{title}</a>
        </li>
    );
}

export default NavItem;