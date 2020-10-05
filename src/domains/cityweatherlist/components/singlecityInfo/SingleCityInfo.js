import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder, MdClear } from "react-icons/md";
import IconButton from "common/ui/IconButton";
import styles from "./SingleCityInfo.module.css";

function SingleCityInfo({ city, onClickFavourite, onClickRemove }) {
  const onClickFavButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClickFavourite(city);
  };
  const onClickDeleteButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClickRemove(city);
  };
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <section className={styles.root}>
      <Link
        to={`/detail?cityId=${city.id}&cityName=${city.name}&region=${city.region}&country=${city.country}`}
        key={city.id}
      >
        <div>
          <h1 className={styles.cityName}>{city.name}</h1>
          <h2 className={styles.countryName}>
            {city.region ? `${city.region}, ${city.country}` : city.country}
          </h2>
        </div>
      </Link>
      <h2 className={styles.temperature}>
        {city.current.temperature || "-"} &#8451;
      </h2>
      <div onClick={stopPropagation}>
        <IconButton
          className={styles.favouriteIcon}
          onClick={onClickFavButton}
          data-testid={`${city.id}_favBtn`}
        >
          {city.isFavourite ? <MdFavorite /> : <MdFavoriteBorder />}
        </IconButton>
      </div>
      <IconButton
        className={clsx(styles.deleteIcon, "visibleOnHover")}
        data-testid={`${city.id}_deleteBtn`}
        onClick={onClickDeleteButton}
      >
        <MdClear />
      </IconButton>
    </section>
  );
}

export default SingleCityInfo;
