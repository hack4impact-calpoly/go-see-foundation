import { IResource } from "@database/resourceSchema";
import styles from "./resourceRow.module.css";
import Resource from "./Resource";

export default function ResourceRow({
  resources,
}: {
  resources: Array<IResource>;
}) {
  console.log("making row");
  console.log(resources);
  return (
    <div className={styles.resourceRow}>
      {resources?.map((single_resource: IResource, index: number) => (
        <Resource key={index} resource={single_resource} />
      ))}
    </div>
  );
}
