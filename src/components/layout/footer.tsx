/**
 * @ployComponent
 * @ployComponentId footer
 * @ployComponentType component
 * @ployComponentPattern footer
 * @ployComponentDescription Footer utilities and hidden page state inputs
 */
type ListItemProps = {
  id: string;
  value: string;
  separator?: string;
};

function ListItem({ id, value, separator }: ListItemProps) {
  return (
    <>
      <input
        type="hidden"
        id={id}
        value={value}
        className="appearance-none box-content hidden p-0 overflow-clip"
      />
      {separator}
    </>
  );
}

export const footer: ListItemProps[] = [
  { id: "current_open", value: "none" },
  { id: "prev_open", value: "none" },
  { id: "prev_type", value: "page_link" },
  { id: "this_spot", value: "-1" },
  { id: "is_domain", value: "msdo.us" },
  { id: "url", value: "msdo" },
  { id: "uid", value: "18737" },
  { id: "current_page", value: "1" },
  { id: "total_pages", value: "1" },
  { id: "limit", value: "50" },
  { id: "viewtype", value: "list" },
  { id: "previewtemplate", value: "" },
  { id: "template", value: "escher" },
  { id: "design", value: "bosch" },
  { id: "templatepath", value: "designs/escher" },
  { id: "designpath", value: "designs/escher/bosch" },
  { id: "sticky_page", value: "none" },
  { id: "o_thumb_nav", value: "no" },
  { id: "is_solo", value: "" },
  { id: "is_direct", value: "" },
  { id: "start_page", value: "1882713" },
];

export default function Footer({
  items = footer,
}: {
  items?: ListItemProps[];
}) {
  return (
    <div id="foot_container" className="box-content">
      {items.map((item, index) => (
        <ListItem
          key={index}
          {...item}
          separator={index < items.length - 1 ? " " : ""}
        />
      ))}
      <fullscreen_option className="box-content inline" />
      <div
        className="box-content w-[64rem] h-9 relative clear-both mt-9"
        data-ploy-refactor-hint="refactor-to-use-margin-padding-gap"
      />
    </div>
  );
}
