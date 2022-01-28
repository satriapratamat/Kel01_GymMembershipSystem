import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import ClubsCardSlides from "../src/components/Card/ClubsCardSlides";
import ClassesCardSlides from "../src/components/Card/ClassesCardSlides";
import { useSelector } from "react-redux";
import { CustomAlert } from "../src/components/Alert/Alert";
import SubscriptionModal from "../src/components/Modal/SubscriptionsModal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import auth from "../src/utils/fetchApi/auth";
import { parseCookies } from "nookies";
import jwtDecode from "../src/utils/jwtDecode/jwtDecode";
import { getUserByID } from "../src/utils/fetchApi/users";

export default function Home() {
  const alertContent = useSelector((state) => state.alert.alertContent);
  const [data, setData] = useState();
  const { token } = parseCookies();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      auth(
        "loginOAuth",
        {
          email: session?.user.email,
          photo: session?.user.image,
        },
        setData
      );
    }
    if (token) {
      const { Id } = jwtDecode();
      getUserByID(token, setData, Id);
    }
  }, [session, token]);
  return (
    <div className={styles.root}>
      <Head>
        <title>CalFit Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bghome}>
        <Image
          src="/backdrop-home.png"
          className={styles.bdhome}
          alt="Backdrop Home"
          width={414}
          height={402}
        />
      </div>
      <header className={styles.header}>
        <Image
          src="/calfit-logo.png"
          className={styles.logo}
          alt="CalFit Logo"
          width={65}
          height={12}
        />
        {data && (
          <Link href="/account">
            <Image
              src={
                data?.photo
                  ? data.photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              className={styles.ppdummy}
              alt="Profile Picture Dummy"
              width={65}
              height={65}
            />
          </Link>
        )}
      </header>
      <main className={styles.main}>
        <div className={styles.div1}>
          <SubscriptionModal />
        </div>
        <div className={styles.div2}>
          <h2>Explore Clubs</h2>
          <Link href="/clubs" passHref>
            <div className={styles.viewall}>View All</div>
          </Link>
        </div>
        <ClubsCardSlides count={5} />
        <div className={styles.div3}>
          <h2>Explore Classes</h2>
          <Link href="/classes" passHref>
            <div className={styles.viewall}>View All</div>
          </Link>
        </div>
        <ClassesCardSlides count={5} />
      </main>
      <br />
      <br />
      {alertContent.status && <CustomAlert data={alertContent} />}
    </div>
  );
}
