import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClassesCardListGrid from "../../src/components/Card/ClassesCardListGrid";
import styles from "../../styles/classes/Index.module.css";
import FeaturedClassesCardSlides from "../../src/components/Card/FeaturedClassesSlides";
import { parseCookies } from "nookies";
import { useState } from "react";
import FilterClassModal from "../../src/components/Modal/FilterClassModal";

export default function Classes() {
  const [openModal, setOpenModal] = useState(false);
  const [filterOption, setFilterOption] = useState({
    online: false,
  });
  const handleOnClick = () => {
    setOpenModal(true);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Classes on CalFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.pagetitle}>
          <h1>Classes</h1>
        </div>
        <div className={styles.description}>
          <h3>New Classes</h3>
        </div>
        <FeaturedClassesCardSlides count={2} />
        <div className={styles.description}>
          <h3>Explore All Classes</h3>
          <FilterAltIcon
            className={styles.filtericon}
            onClick={() => handleOnClick()}
          />
        </div>
        {openModal && (
          <FilterClassModal
            setOpenModal={setOpenModal}
            filter={{ online: filterOption.online }}
            setFilterOption={setFilterOption}
          ></FilterClassModal>
        )}
        <ClassesCardListGrid filter={filterOption} />
      </main>
    </div>
  );
}
