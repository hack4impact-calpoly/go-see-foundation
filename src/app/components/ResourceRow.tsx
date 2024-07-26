import { IResource } from "@database/resourceSchema";
import styles from "./resourceRow.module.css";
import Resource from "./Resource";
import { RefObjectMap } from "app/resources/page";

export default function ResourceRow({
  resources,
  startIndex,
  setRefs,
  refHandler,
}: {
  resources: Array<IResource>;
  startIndex: number;
  setRefs: React.Dispatch<
    React.SetStateAction<RefObjectMap<HTMLAnchorElement>>
  >;
  refHandler: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div className={styles.resourceRow}>
      {resources?.map((single_resource: IResource, index: number) => (
        <Resource
          key={index}
          resource={single_resource}
          refIndex={startIndex + index * 2}
          setRefs={setRefs}
          refHandler={refHandler}
        />
      ))}
    </div>
  );
}
