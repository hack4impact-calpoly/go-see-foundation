import styles from "./founderStory.module.css";
import founderPhoto from "../images/founderPhoto.png";
import Image from "next/image";
import Link from "next/link";

export default function FounderStory() {
  const founderStory1 =
    "My name is Allyson. I’ve been dealing with vision loss since the age of seven. I know first hand the uncertainty and challenges that come with losing your sight. I’ve found that even with vision loss, it can be fun to explore and engage with others, especially when they’re on a similar journey.";

  // const founderStory2 =
  //   "I’ve been dealing with vision loss for as long as I can remember and have had over 25 eye surgeries. I have been diagnosed with juvenile inflammatory arthritis, uveitis, glaucoma, cataracts, and my right eye is now a prosthetic. Throughout my vision journey, I have experienced the life changing uncertainty and challenges that come with losing your sight.";

  return (
    <div className={styles.container}>
      <div className={styles.containerText} tabIndex={0}>
        <div className={styles.title}>The founder and her story</div>
        <div className={styles.imageContainerIn}>
          <Image
            className={styles.imageIn}
            src={founderPhoto}
            alt="founder photo"
          />
        </div>
        <div className={styles.paragraphs}>
          <div className={styles.founderText}>{founderStory1}</div>
          {/* <div className={styles.founderText}>{founderStory2}</div> */}
        </div>

        <Link href="/about">
          <button className={styles.buttonStyle}>LEARN MORE</button>
        </Link>
      </div>
      <div className={styles.imageContainerOut}>
        <Image
          className={styles.imageOut}
          src={founderPhoto}
          alt="founder photo"
        />
      </div>
    </div>
  );
}
