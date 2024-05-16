import styles from "./eventName.module.css";

export default function eventName(context: any) {
  const eventName = decodeURIComponent(context.params.eventName);

  return (
    <div className={styles.eventHistory}>
      <div className={styles.eventTitle}>{eventName}</div>
    </div>
  );
}
