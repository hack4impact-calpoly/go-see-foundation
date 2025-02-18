import { useErrorContext } from "./ErrorContext";

export default function ErrorMessageDisplay() {
  const { errorMessages } = useErrorContext();

  return (
    <div>
      {errorMessages.size > 0 && (
        <ul>
          {Array.from(errorMessages).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
