/**
 * @ployComponent
 * @ployComponentId navbar
 * @ployComponentType component
 * @ployComponentPattern navbar
 * @ployComponentDescription Navigation bar with logo/link and a list of project, page, and social links
 */
type LinkItemProps = {
  id: string;
  className: string;
  href: string;
  id_1: string;
  linkClassName: string;
  text: string;
};

function LinkItem({
  id,
  className,
  href,
  id_1,
  linkClassName,
  text,
}: LinkItemProps) {
  return (
    <div id={id} className={className}>
      <a
        href={href}
        id={id_1}
        rel="history"
        name="msdo"
        className={linkClassName}
      >
        {text}
      </a>
    </div>
  );
}

export const links: LinkItemProps[] = [
  {
    id: "menu_14634126",
    className: "box-content project_link",
    href: "https://msdo.us/Rainfall-Website",
    id_1: "p14634126",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Rainfall Website",
  },
  {
    id: "menu_14275059",
    className: "box-content project_link",
    href: "https://msdo.us/Rainfall-Mobile",
    id_1: "p14275059",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Rainfall Mobile",
  },
  {
    id: "menu_12273661",
    className: "box-content project_link",
    href: "https://msdo.us/Econiscore",
    id_1: "p12273661",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Econiscore",
  },
  {
    id: "menu_13748387",
    className: "box-content project_link",
    href: "https://msdo.us/Coinboost",
    id_1: "p13748387",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Coinboost",
  },
  {
    id: "menu_13920929",
    className: "box-content project_link",
    href: "https://msdo.us/Truvalue-Website",
    id_1: "p13920929",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Truvalue Website",
  },
  {
    id: "menu_13920927",
    className: "box-content project_link",
    href: "https://msdo.us/Truvalue-Platform",
    id_1: "p13920927",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Truvalue Platform",
  },
  {
    id: "menu_13920931",
    className: "box-content project_link",
    href: "https://msdo.us/Truvalue-Wealth",
    id_1: "p13920931",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Truvalue Wealth",
  },
  {
    id: "menu_13920928",
    className: "box-content project_link",
    href: "https://msdo.us/Slalome",
    id_1: "p13920928",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Slalome",
  },
  {
    id: "menu_13923228",
    className: "box-content project_link",
    href: "https://msdo.us/LaterPay",
    id_1: "p13923228",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "LaterPay",
  },
  {
    id: "menu_13925015",
    className: "box-content project_link",
    href: "https://msdo.us/Wickr",
    id_1: "p13925015",
    linkClassName:
      "box-content text-ploy-neutral-primary-600 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-ploy-text-primary",
    text: "Wickr",
  },
  {
    id: "menu_1882725",
    className: "box-content page_link",
    href: "https://msdo.us/About",
    id_1: "p1882725",
    linkClassName:
      "box-content text-ploy-neutral-primary-800 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-yellow-600",
    text: "About",
  },
  {
    id: "menu_1882732",
    className: "box-content page_link",
    href: "https://msdo.us/Contact-Us-1",
    id_1: "p1882732",
    linkClassName:
      "box-content text-ploy-neutral-primary-800 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:bg-transparent hover:text-yellow-600",
    text: "Contact Us",
  },
];

export default function Navbar({ items = links }: { items?: LinkItemProps[] }) {
  return (
    <div className="box-content leading-[1.4] fixed z-[12] left-[3.125rem] top-[6.25rem] nav_container">
      <div id="nav_page_1" className="box-content">
        {items.map((item, index) => (
          <LinkItem key={index} {...item} />
        ))}
        <div id="menu_1882815" className="box-content link_link">
          <a
            href="http://twitter.com/#!/mstrehlow"
            target="_blank"
            name="msdo"
            id="p1882815"
            className="box-content text-ploy-neutral-primary-800 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:text-yellow-300"
          >
            {"Twitter"}
          </a>
        </div>
        <div id="menu_12273662" className="box-content link_link">
          <a
            href="https://www.linkedin.com/in/markstrehlow"
            target="_blank"
            name="msdo"
            id="p12273662"
            className="box-content text-ploy-neutral-primary-800 leading-7 text-sm pt-0.5 pb-0.5 px-0.5 hover:text-yellow-300"
          >
            {"LinkedIn"}
          </a>
        </div>
      </div>
    </div>
  );
}
