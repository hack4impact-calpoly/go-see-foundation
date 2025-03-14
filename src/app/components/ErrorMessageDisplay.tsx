import { useErrorContext } from "./ErrorContext";
import styles from "./ErrorMessageDisplay.module.css";

export default function ErrorMessageDisplay() {
  const { errorMessages } = useErrorContext();

  return (
    <div>
      {errorMessages.size > 0 && (
        <ul>
          {Array.from(errorMessages).map((error, index) => (
            <li className={styles.errorItem} key={index}>
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
